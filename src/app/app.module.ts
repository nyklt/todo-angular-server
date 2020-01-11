import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductsListComponent, ProductsDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
