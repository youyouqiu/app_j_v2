package com.mxkj.xinkongjianpzt;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.mxkj.xinkongjianpzt.util.OpenFileUtil;

import java.io.File;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@RequiresApi(api = Build.VERSION_CODES.KITKAT)
public class ShowDownLoadActivity extends AppCompatActivity implements View.OnClickListener {

    private DownloadManager downManager;
    private long myDwonloadID;
    private String description;
    private Button downLoadBtn;
    private boolean downloadStatus = false;
    private static int HANDLE_DOWNLOAD = 0x11;
    private static int HANDLE_SUCCESS = 0x10;
    private BroadcastReceiver downLoadBroadcast;
    private ScheduledExecutorService scheduledExecutorService;
    private DownloadChangeObserver downloadObserver;


    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_down_load);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayHomeAsUpEnabled(true);//左侧添加一个默认的返回图标
        toolbar.setNavigationOnClickListener(v -> finish());
        bindView();
        //动态申请权限
        requestPermission();
    }

    @SuppressLint("CutPasteId")
    public void bindView(){
        description = this.getIntent().getStringExtra("description");
        TextView fileName = findViewById(R.id.fileName);
        downLoadBtn =  findViewById(R.id.downLoadBtn);
        fileName.setText(description);
        setTitle(description);
        downLoadBtn.setOnClickListener(this);
        findViewById(R.id.reDownLoadBtn).setOnClickListener(this);
        File file = new File(this.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS),description);
        if (file.exists()) {
            findViewById(R.id.reDownLoadBtn).setVisibility(View.VISIBLE);
            downLoadBtn.setText("其它应用打开");
            downloadStatus = true;
        }
    }

    private void setEnableView(boolean enable){
        findViewById(R.id.reDownLoadBtn).setEnabled(enable);
        downLoadBtn.setEnabled(enable);
    }

    @Override
    public void onClick(View v) {
        if(v.getId() == R.id.downLoadBtn){
            if(!downloadStatus){
                downLoadStart( this.getIntent().getStringExtra("url"),
                        description);
            }else{
                OpenFileUtil.openFileByPath(this, description);
            }
        }else if(v.getId() == R.id.reDownLoadBtn){
            downLoadStart( this.getIntent().getStringExtra("url"),
                    this.getIntent().getStringExtra("description"));
        }
    }
    //开始下载
    public void downLoadStart(String url,String description){
        setEnableView(false);
        downManager = (DownloadManager)this.getSystemService(Context.DOWNLOAD_SERVICE);
        downloadObserver = new DownloadChangeObserver();
        registerContentObserver();

        Uri uri = Uri.parse(url);
        DownloadManager.Request request = new DownloadManager.Request(uri);

        // 设置允许使用的网络类型，这里是移动网络和wifi都可以
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);

        //设置通知栏标题
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        request.setMimeType("application/vnd.android.package-archive");
        request.setDescription(description);
        request.setAllowedOverRoaming(false);
        // 设置文件存放目录
        request.setDestinationInExternalFilesDir(this, Environment.DIRECTORY_DOWNLOADS, description);
        myDwonloadID = downManager.enqueue(request);
        registerBroadcast();
    }

    //动态申请权限
    private void requestPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 1);
        }
    }

    /**
     * 关闭定时器，线程等操作
     */
    private void close() {
        if (scheduledExecutorService != null && !scheduledExecutorService.isShutdown()) {
            scheduledExecutorService.shutdown();
        }

        if (downLoadHandler != null) {
            downLoadHandler.removeCallbacksAndMessages(null);
        }
    }

    /**
     * 监听下载进度
     */
    private class DownloadChangeObserver extends ContentObserver {

        public DownloadChangeObserver() {
            super(downLoadHandler);
            scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();
        }

        /**
         * 当所监听的Uri发生改变时，就会回调此方法
         *
         * @param selfChange 此值意义不大, 一般情况下该回调值false
         */
        @Override
        public void onChange(boolean selfChange) {
            scheduledExecutorService.scheduleAtFixedRate(progressRunnable, 0, 2, TimeUnit.SECONDS);
        }
    }

    /**
     * 注册ContentObserver
     */
    private void registerContentObserver() {
        /** observer download change **/
        if (downloadObserver != null) {
            getContentResolver().registerContentObserver(Uri.parse("content://downloads/my_downloads"), false, downloadObserver);
        }
    }

    /**
     * 注销ContentObserver
     */
    private void unregisterContentObserver() {
        if (downloadObserver != null) {
            getContentResolver().unregisterContentObserver(downloadObserver);
        }
    }

    /**
     * 注册广播
     */
    private void registerBroadcast() {
        /**注册service 广播 1.任务完成时 2.进行中的任务被点击*/
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        intentFilter.addAction(DownloadManager.ACTION_NOTIFICATION_CLICKED);
        registerReceiver(downLoadBroadcast = new DownLoadBroadcast(), intentFilter);
    }

    /**
     * 注销广播
     */
    private void unregisterBroadcast() {
        if (downLoadBroadcast != null) {
            unregisterReceiver(downLoadBroadcast);
            downLoadBroadcast = null;
        }
    }

    /**
     * 接受下载完成广播
     */
    private class DownLoadBroadcast extends BroadcastReceiver {

        @RequiresApi(api = Build.VERSION_CODES.KITKAT)
        @Override
        public void onReceive(Context context, Intent intent) {
            long downId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (DownloadManager.ACTION_DOWNLOAD_COMPLETE.equals(Objects.requireNonNull(intent.getAction()))) {
                if (downId == myDwonloadID) {
                    close();
                    downLoadHandler.sendEmptyMessage(HANDLE_SUCCESS);
                }
            }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private  Runnable progressRunnable = new Runnable() {
        @Override
        public void run() {
            queryDownTask(downManager);
        }
    };

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterBroadcast();
        unregisterContentObserver();
    }

    @SuppressLint("HandlerLeak")
    Handler downLoadHandler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (HANDLE_DOWNLOAD == msg.what) {
                //被除数可以为0，除数必须大于0
                if  ( downLoadBtn!=null && msg.arg1 >= 0 && msg.arg2 > 0) {
                    downLoadBtn.setText(String.format("下载中（%.1f%%）", (msg.arg1 / (float) msg.arg2)*100));
//                    downLoadHandler.postDelayed(progressRunnable,100);
                }
            } else if(msg.what == 0x10){
                setEnableView(true);
                downLoadBtn.setText("其它应用打开");
                downloadStatus = true;
                findViewById(R.id.reDownLoadBtn).setVisibility(View.VISIBLE);
            }
        }
    };
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void queryDownTask(DownloadManager downloadManager) {
        DownloadManager.Query query = new DownloadManager.Query().setFilterById(myDwonloadID);
        Cursor cursor = null;
        int[] bytesAndStatus = new int[]{
                -1, -1, 0
        };
        try{
            cursor = downloadManager.query(query);
            if (cursor != null && cursor.moveToFirst()) {
                //已经下载文件大小
                bytesAndStatus[0] = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                //下载文件的总大小
                bytesAndStatus[1] = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
                //下载状态
                bytesAndStatus[2] = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
                downLoadHandler.sendMessage(downLoadHandler.obtainMessage(HANDLE_DOWNLOAD, bytesAndStatus[0], bytesAndStatus[1], bytesAndStatus[2]));
            }
        }finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }
}
