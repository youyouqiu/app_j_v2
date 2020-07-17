#import <Foundation/Foundation.h>

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#elif __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#elif __has_include("React/RCTBridgeModule.h")
#import "React/RCTBridgeModule.h"
#endif


@interface DeviceTokenModule : NSObject <RCTBridgeModule>
+(nonnull instancetype)defaultManager;
-(void)getDeviceTokenFinished:(nonnull NSString*) deviceToken;
@end
