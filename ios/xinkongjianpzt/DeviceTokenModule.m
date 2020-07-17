//
//  DeviceTokenUtils.m
//  xinkongjianpzt
//
//  Created by 新空间 on 2018/10/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DeviceTokenModule.h"

static DeviceTokenModule* _instance;
static NSString * _deviceToken;

@implementation DeviceTokenModule
{
  RCTPromiseResolveBlock _getDeviceTokenResolve;
}
RCT_EXPORT_MODULE(DeviceToken);

@synthesize bridge = _bridge;

+ (id)allocWithZone:(NSZone *)zone {
  static DeviceTokenModule *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (id)init {
  self = [super init];
  _instance = self;
  return self;
}

+ (nonnull instancetype)defaultManager{
  return _instance;
}

-(void)getDeviceTokenFinished: (NSData*) deviceToken{
  NSMutableString *hexString = [NSMutableString string];
  NSUInteger deviceTokenLength = deviceToken.length;
  const unsigned char *bytes = deviceToken.bytes;
  for (NSUInteger i = 0; i < deviceTokenLength; i++) {
    [hexString appendFormat:@"%02x", bytes[i]];
  }
  
  _deviceToken =  [hexString copy];
}


RCT_EXPORT_METHOD(getDeviceToken: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  if(_deviceToken){
    resolve(_deviceToken);
    return;
  }
  _getDeviceTokenResolve = resolve;
  
}

@end
