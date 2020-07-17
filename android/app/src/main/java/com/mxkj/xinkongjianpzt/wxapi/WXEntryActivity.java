package com.mxkj.xinkongjianpzt.wxapi; // package 为包名 本项目为：mxhy.yaokongjian

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}