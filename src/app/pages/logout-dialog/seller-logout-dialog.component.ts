import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-seller-logout-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose
  ],
  templateUrl: './seller-logout-dialog.component.html',
  styleUrl: './seller-logout-dialog.component.css'
})
export class SellerLogoutDialogComponent {
  constructor(public DialogRef:MatDialogRef<SellerLogoutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }
}
