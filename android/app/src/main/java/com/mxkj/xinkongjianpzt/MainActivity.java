package com.mxkj.xinkongjianpzt;
import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;
import com.umeng.analytics.MobclickAgent;
import com.umeng.analytics.MobclickAgent.EScenarioType;
import android.content.Intent;
import android.content.res.Configuration;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "xinkongjianpzt";
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    
    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }
}
