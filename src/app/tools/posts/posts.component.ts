import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {PostData} from "../../pages/post-feed/post-feed.component";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {MatDialog} from "@angular/material/dialog";
import {ReplyComponent} from "../reply/reply.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  ngOnInit(): void {
      this.getCreatorInfo()
  }
  @Input() postData!:PostData;
  firestore=new FirebaseTSFirestore();
  creatorName!:string;
  creatorDescription!:string;

  constructor(private dialog:MatDialog) {
  }
  getCreatorInfo(){
    this.firestore.getDocument({
      path:["Users",this.postData.creatorId],
      onComplete:result=>{
        let userDocument=result.data();
        if (userDocument) {

          this.creatorDescription = userDocument['description'];
          this.creatorName = userDocument['publicName'];
        }

      }

    })
  }


  onReplyClick() {

    this.dialog.open(ReplyComponent)

  }
}
