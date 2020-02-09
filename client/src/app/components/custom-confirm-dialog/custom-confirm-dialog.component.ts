import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-custom-confirm-dialog',
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrls: ['./custom-confirm-dialog.component.scss']
})
export class CustomConfirmDialogComponent implements OnInit {

  title: string;
  message: string

  constructor(public dialogRef: MatDialogRef<CustomConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title, message }) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

}
