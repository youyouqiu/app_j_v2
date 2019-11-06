package com.mxkj.xinkongjianpzt.feedback;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.util.Log;


import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.alibaba.sdk.android.feedback.util.IUnreadCountCallback;
import com.alibaba.sdk.android.man.MANHitBuilders;
import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.content.ContentValues.TAG;
import android.os.Handler;
import android.os.Looper;

import java.util.ArrayList;
import java.util.concurrent.Callable;

public class FeedbackModule extends ReactContextBaseJavaModule {
    private static ReactContext context;
    public FeedbackModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
    private Handler handler = new Handler(Looper.getMainLooper());
    

    @Override
    public String getName() {
        return "Feedback";
    }

    private void initPermission(Activity currentActivity) {
        String permissions[] = {Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.CAMERA,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
        };

        ArrayList<String> toApplyList = new ArrayList<String>();

        for (String perm :permissions){
            if (PackageManager.PERMISSION_GRANTED != ContextCompat.checkSelfPermission(currentActivity, perm)) {
                toApplyList.add(perm);
                //进入到这里代表没有权限.

            }
        }
        String tmpList[] = new String[toApplyList.size()];
        if (!toApplyList.isEmpty()){
            ActivityCompat.requestPermissions(currentActivity, toApplyList.toArray(tmpList), 123);
        }

    }
    @ReactMethod
    public void show(final Callback callback) {
        Activity currentActivity = getCurrentActivity();
        if(currentActivity==null){

            return;
        }
        initPermission(currentActivity);

        FeedbackAPI.openFeedbackActivity(new Callable() {
            @Override
            public Object call() throws Exception {
                if(callback!=null){
                    callback.invoke();
                }
                return null;
            }
        }, (Callable)null);
        }


        @ReactMethod
    public void getFeedbackUnreadCount(final Callback callback){
            FeedbackAPI.getFeedbackUnreadCount(new IUnreadCountCallback() {
                @Override
                public void onSuccess(final int unreadCount) {
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.invoke(true,unreadCount);

                        }
                    });
                }

                @Override
                public void onError(final int i,final String s) {
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            callback.invoke(false);
                        }
                    });
                }
            });
        }

    @ReactMethod
    public void setDefaultUserContactInfo(String userInfo){
        FeedbackAPI.setDefaultUserContactInfo(userInfo);
    }

    }

   

