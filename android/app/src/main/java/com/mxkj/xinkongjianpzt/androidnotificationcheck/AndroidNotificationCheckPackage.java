/*
 * @Author: Kary
 * @Date: 2020-05-14 11:48:31
 * @Description: 
 */
package com.mxkj.xinkongjianpzt.androidnotificationcheck;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class AndroidNotificationCheckPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
  
    @Override
    public List createNativeModules(
                                ReactApplicationContext reactContext) {
      List modules = new ArrayList<>();
  
      modules.add(new AndroidNotificationCheckModule(reactContext));
  
      return modules;
    }
  
  }