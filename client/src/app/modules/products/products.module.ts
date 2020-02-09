import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsComponent} from './components/products/products.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';

import {ProductsRoutingModule} from './products-routing.module';

import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule {
}
