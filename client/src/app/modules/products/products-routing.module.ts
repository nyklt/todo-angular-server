import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';
import {AuthGuard} from '../../shared/guards/auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   component: ProductsListComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: ':id', component: ProductsDetailsComponent}
  //   ]
  // }
  {
    path: '',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: ProductsDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
