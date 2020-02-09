import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatToolbarModule, MatPaginatorModule, MatSlideToggleModule, MatTabsModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // material modules

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatMenuModule,
    FlexLayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTabsModule
  ],
  exports: [

    // material modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatMenuModule,
    FlexLayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTabsModule
  ]
})
export class SharedModule {
}
