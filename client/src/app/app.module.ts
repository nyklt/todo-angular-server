import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import {SimpleNotificationsModule} from 'angular2-notifications';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';

import {PaginationComponent} from "./shared/components/pagination/pagination.component";

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from "./shared/core.module";
import {UnknownRouteActivityComponent} from "./components/unknown-route-activity/unknown-route-activity.component";
import {SideNavigationComponent} from "./components/side-navigation/side-navigation.component";
import {TopNavigationComponent} from "./components/top-navigation/top-navigation.component";


@NgModule({
  declarations: [
    AppComponent,
    UnknownRouteActivityComponent,
    HomeComponent,
    TopNavigationComponent,
    SideNavigationComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
