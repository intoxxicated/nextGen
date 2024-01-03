import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FirebaseTSStorage} from "firebasets/firebasetsStorage/firebaseTSStorage";

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent {
  firestore=new FirebaseTSStorage();

  onSendClick(commentInput: HTMLInputElement) {

  }
}
