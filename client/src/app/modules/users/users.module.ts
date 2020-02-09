import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserManagementService} from '../../shared/api/user-service/user-management.service';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {SharedModule} from '../../shared/shared.module';
import {UserDialogComponent} from './components/user-dialog/user-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    UserManagementService
  ],
  entryComponents: [
    UserDialogComponent
  ]
})
export class UsersModule {
}
