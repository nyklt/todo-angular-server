import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from './api/product-service/product.service';
import {UserManagementService} from "./api/user-service/user-management.service";
import {AuthService} from "./api/auth-service/auth.service";
import {httpInterceptorProviders} from "./http-interceptors";
import {ApiService} from "./api/api.service";
import {NotificationsService} from "./common-services/notifications.service";

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    // API
    ApiService,
    ProductService,
    UserManagementService,
    AuthService,

    // common services
    NotificationsService,

    //http-interceptors
    httpInterceptorProviders
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
