package com.mxkj.xinkongjianpzt;

import android.app.Application;
import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.mxkj.xinkongjianpzt.feedback.FeedbackPackage;
import com.mxkj.xinkongjianpzt.umapi.RNUMConfigure;
import com.mxkj.xinkongjianpzt.umapi.DplusReactPackage;
import com.mxkj.xinkongjianpzt.androidnotificationcheck.AndroidNotificationCheckPackage;
import com.umeng.commonsdk.UMConfigure;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.jeepeng.react.xgpush.PushPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import cn.jiguang.analytics.android.api.JAnalyticsInterface;
import cn.jpush.reactnativejanalytics.JAnalyticsPackage;
// import org.wonday.orientation.OrientationPackage;


import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static boolean SHUTDOWN_LOG = false;
  private static boolean SHUTDOWN_TOAST = false;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      packages.add(new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG, "https://update.puzhentan.com"));
      packages.add(new FeedbackPackage());
      packages.add(new DownloadApkPackage());
      packages.add(new DplusReactPackage());
      packages.add(new AndroidNotificationCheckPackage());
      packages.add(new JAnalyticsPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG));
      // packages.add(new OrientationPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    JAnalyticsInterface.init(this);
    UMConfigure.setLogEnabled(true);
    RNUMConfigure.init(this, "5d8dc7fa570df327db000b64", "UMENG_CHANNEL", UMConfigure.DEVICE_TYPE_PHONE, "");
    FeedbackAPI.init(this, "25131021", "d7b50f8a50107dcb9ecb87c87cbc9a7c");
  }

}
