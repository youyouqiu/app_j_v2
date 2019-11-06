//
//  RCTJAnalyticsModule.m
//  janalytics
//
//  Created by oshumini on 2017/7/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FeedbackModule.h"
#import <YWFeedbackFMWK/YWFeedbackKit.h>
#import <YWFeedbackFMWK/YWFeedbackViewController.h>

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTEventDispatcher.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
#import "RCTEventDispatcher.h"
#import "RCTRootView.h"
#import "RCTBridge.h"
#elif __has_include("React/RCTBridge.h")
#import "React/RCTEventDispatcher.h"
#import "React/RCTRootView.h"
#import "React/RCTBridge.h"
#endif

static NSString * const kAppKey = @"25141221";
static NSString * const kAppSecret = @"079c36bada3409ea2b88787ca62b0b8e";

@interface RCTFeedbackModule ()<UISplitViewControllerDelegate>
@property (nonatomic, strong) YWFeedbackKit *feedbackKit;
@end

@implementation RCTFeedbackModule

RCT_EXPORT_MODULE(Feedback);

@synthesize bridge = _bridge;

+ (id)allocWithZone:(NSZone *)zone {
  static RCTFeedbackModule *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (id)init {
  self = [super init];
  return self;
}


- (UIViewController*) getRootVC {
  UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  while (root.presentedViewController != nil) {
    root = root.presentedViewController;
  }

  return root;
}

RCT_EXPORT_METHOD(show: (RCTResponseSenderBlock)callback){
  __weak typeof(self) weakSelf = self;
  [self.feedbackKit makeFeedbackViewControllerWithCompletionBlock:^(YWFeedbackViewController *viewController, NSError *error) {
    if (viewController != nil) {
      
      UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:viewController];
      
      
      dispatch_async(dispatch_get_main_queue(), ^{
        [[weakSelf getRootVC] presentViewController:nav animated:YES completion:^(){
         // if(callback!=nil){
          //  callback(@[]);
          //}
        }];
      });
      
      [viewController setCloseBlock:^(UIViewController *aParentController){
        [aParentController dismissViewControllerAnimated:YES completion: ^(){
          if(callback!=nil){
            callback(@[]);
          }
        }];
      }];
    } else {
     
      
    }
  }];
  
  
}

#pragma mark getter
- (YWFeedbackKit *)feedbackKit {
  if (!_feedbackKit) {
    _feedbackKit = [[YWFeedbackKit alloc] initWithAppKey:kAppKey appSecret:kAppSecret];
  }
  return _feedbackKit;
}

RCT_EXPORT_METHOD(getFeedbackUnreadCount:(RCTResponseSenderBlock)callback){
 
  [self.feedbackKit getUnreadCountWithCompletionBlock:^(NSInteger unreadCount, NSError *error) {
    
    if (error == nil) {
        NSNumber* count = [NSNumber numberWithLong:unreadCount];
      if(callback!=nil){
        callback(@[@true, count]);
      }
      
      
    } else {
      if(callback!=nil){
      callback(@[@false]);
      }
    }
  
  }];
  
  
}

RCT_EXPORT_METHOD(setDefaultUserContactInfo:(NSString*)userInfo){
 
  self.feedbackKit.extInfo = @{@"用户":userInfo};

  
}
@end

