package com.mxkj.xinkongjianpzt;

import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.Context;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class DownloadApk extends ReactContextBaseJavaModule {

    public static String description;
    private Promise mPromise;
    public static int REQUEST_ECODE_SCAN = 100;

    DownloadManager downManager;
    Activity myActivity;

    public DownloadApk(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "DownloadApk";
    }

    @ReactMethod
    public void downloading(String url, String description) {
       DownloadApk.description = description;
        myActivity = getCurrentActivity();
        if (myActivity==null){
            return;
        }
        if(!description.contains(".apk")){

            Intent intent1 = new Intent(myActivity,ShowDownLoadActivity.class);
            intent1.putExtra("description",description);
            intent1.putExtra("url",url);
            intent1.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            myActivity.startActivity(intent1);
        }else {
            downManager = (DownloadManager)myActivity.getSystemService(Context.DOWNLOAD_SERVICE);
            Uri uri = Uri.parse(url);
            DownloadManager.Request request = new Request(uri);

            // 设置允许使用的网络类型，这里是移动网络和wifi都可以
            request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);

            //设置通知栏标题
            request.setNotificationVisibility(Request.VISIBILITY_VISIBLE);
            request.setMimeType("application/vnd.android.package-archive");
            request.setTitle("下载");
            request.setDescription(description);
            request.setAllowedOverRoaming(false);

            // 设置文件存放目录
            request.setDestinationInExternalFilesDir(myActivity, Environment.DIRECTORY_DOWNLOADS, description);
//        Toast.makeText(myActivity,"开始下载",Toast.LENGTH_SHORT).show();
            long downloadid = downManager.enqueue(request);
            SharedPreferences sPreferences = myActivity.getSharedPreferences("ggfw_download", 0);
            sPreferences.edit().putLong("ggfw_download_apk", downloadid).apply();
        }
    }
}