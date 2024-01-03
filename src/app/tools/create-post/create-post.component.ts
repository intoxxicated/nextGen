import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {FirebaseTSStorage} from "firebasets/firebasetsStorage/firebaseTSStorage";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {FirebaseTSApp} from "firebasets/firebasetsApp/firebaseTSApp";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  selectedImageFile !:File;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  constructor(private dialog: MatDialogRef<CreatePostComponent>) { }

  onPostClick(commentInput: HTMLTextAreaElement) {
    let comment = commentInput.value;
    if(comment.length <= 0 ) return;
    if(this.selectedImageFile) {
      this.uploadImagePost(comment);
    } else {
      this.uploadPost(comment);
    }

  }

  uploadImagePost(comment: string){
    let postId = this.firestore.genDocId();
    this.storage.upload(
      {
        uploadName: "upload Image Post",
        path: ["Posts", postId, "image"],
        data: {
          data: this.selectedImageFile
        },
        onComplete: (downloadUrl) => {
          const currentUser = this.auth.getAuth().currentUser;

          if (currentUser !== null) {
            const uid = currentUser.uid;
            this.firestore.create(
              {
                path: ["Posts", postId],
                data: {
                  comment: comment,
                  creatorId: uid,
                  imageUrl: downloadUrl,
                  timestamp: FirebaseTSApp.getFirestoreTimestamp()
                },
                onComplete: (docId) => {

                  this.dialog.close();
                }
              }
            );
          }
        }
      }
    );
  }

  uploadPost(comment: string) {
    const currentUser = this.auth.getAuth().currentUser;

    if (currentUser !== null) {
      const uid = currentUser.uid;
      this.firestore.create(
        {
          path: ["Posts"],
          data: {
            comment: comment,
            creatorId: uid,
            timestamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete: (docId) => {
            this.dialog.close();
          }
        }
      );
    }
  }

  onPhotoSelected(photoSelector: HTMLInputElement) {
    if(photoSelector.files)
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        if(fileReader.result){
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
        }
      }
    );
  }
  // selectedImageFile!:File
  //
  // onPhotoSelected(photoSelector: HTMLInputElement) {
  //   if(!this.selectedImageFile) return;
  //
  //   if(photoSelector.files)
  //   this.selectedImageFile=photoSelector.files[0];
  //   let fileReader=new FileReader();
  //   fileReader.readAsDataURL(this.selectedImageFile);
  //   fileReader.addEventListener("loadend", ev=>{
  //     if(fileReader.result){
  //       let readableString=fileReader.result.toString();
  //       let postPreviewImage=<HTMLImageElement>document.getElementById("post-preview-image");
  //       postPreviewImage.src=readableString;
  //     }
  //
  //
  //   })
  //
  //
  // }
}
