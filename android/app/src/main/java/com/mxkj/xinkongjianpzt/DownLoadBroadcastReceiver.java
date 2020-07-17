package com.mxkj.xinkongjianpzt;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.widget.Toast;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {

    public static final int REQUEST_CODE_APP_INSTALL = 0;



    @Override
    public void onReceive(Context context, Intent intent) {

        long myDwonloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sPreferences = context.getSharedPreferences("ggfw_download", 0);
        long refernece = sPreferences.getLong("ggfw_download_apk", 0);

        if (refernece == myDwonloadID) {
            DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            DownloadManager.Query querybyId = new DownloadManager.Query();

            querybyId.setFilterById(myDwonloadID);
            Cursor myDownload = dManager.query(querybyId);

            if (myDownload.moveToFirst()) {
                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));

                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    Intent intent1 = new Intent(context,DownloadActivity.class);
                    intent1.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent1);
                } else {
                    Toast.makeText(context, "下载失败，删除残留文件", Toast.LENGTH_LONG).show();
                    dManager.remove(myDwonloadID);
                    myDownload.close();
                    return;
                }
                myDownload.close();
            }

        }
    }



}
