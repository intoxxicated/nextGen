import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {NgClass} from "@angular/common";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
@Input() show! :boolean;
firestore:FirebaseTSFirestore;
auth:FirebaseTSAuth;

constructor() {
  this.firestore=new FirebaseTSFirestore();
  this.auth=new FirebaseTSAuth();
}

  onContinueClick(nameInput: HTMLInputElement, descriptionInput: HTMLTextAreaElement) {
  let name=nameInput.value;
  let description=descriptionInput.value;
    const currentUser = this.auth.getAuth().currentUser;

    if (currentUser !== null) {
      const uid = currentUser.uid;
      this.firestore.create(
        {
          path: ["Users", uid],
          data: {
            publicName: name,
            description: description

          },
          onComplete: (docId) => {
            alert("profile created");
            nameInput.value = "";
            descriptionInput.value = "";
          },
          onFail: (err) => {
            alert("Failed")

          }
        }
      )
    }




  }
}
