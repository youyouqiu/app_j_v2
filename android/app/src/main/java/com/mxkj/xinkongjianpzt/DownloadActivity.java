package com.mxkj.xinkongjianpzt;

import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import java.io.File;

public class DownloadActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        installProcess();
    }


    //安装应用的流程
    private void installProcess() {
        boolean haveInstallPermission;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            //先获取是否有安装未知来源应用的权限
            haveInstallPermission = getPackageManager().canRequestPackageInstalls();
            if (!haveInstallPermission) {//没有权限
                View view = this.getLayoutInflater().inflate(R.layout.layout,null);
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setView(view);
                builder.setOnCancelListener(dialog -> finish());
                builder.create().show();
                view.findViewById(R.id.btnOk).setOnClickListener(v -> startInstallPermissionSettingActivity());
                view.findViewById(R.id.btnCancel).setOnClickListener(v -> finish());
            }else {
                //有权限，开始安装应用程序
                installApp(this);
            }
        }else{
            //有权限，开始安装应用程序
            installApp(this);
        }

    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    private void startInstallPermissionSettingActivity() {
        Uri packageURI = Uri.parse("package:" + getPackageName());
        //注意这个是8.0新API
        Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, packageURI);
        startActivityForResult(intent, 10086);
    }

    //安装应用
    public void installApp(Context context) {

        File file = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), DownloadApk.description);

        if (file.exists()) {
            Intent intent = new Intent(Intent.ACTION_VIEW);
            // 由于没有在Activity环境下启动Activity,设置下面的标签
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            if (Build.VERSION.SDK_INT >= 24) { //判读版本是否在7.0以上
                // 参数1 上下文, 参数2 Provider主机地址 和配置文件中保持一致, 参数3  共享的文件
                Uri apkUri = FileProvider.getUriForFile(context, BuildConfig.APPLICATION_ID + "" + ".fileprovider", file);
                // 添加这一句表示对目标应用临时授权该Uri所代表的文件
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
            } else {
                intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
            }
            context.startActivity(intent);
        } else {
            Toast.makeText(context, "安装失败", Toast.LENGTH_SHORT).show();
        }
        finish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 10086 &&  resultCode == RESULT_OK) {
            installProcess();
        }else {
            finish();
        }
    }

}
