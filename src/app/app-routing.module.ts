import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'products-list', pathMatch: 'full'},
  {path: 'products-list', component: ProductsListComponent},
  {
    path: 'products-list/:id',
    component: ProductsDetailsComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
