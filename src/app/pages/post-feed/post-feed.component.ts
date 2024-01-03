import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostComponent} from "../../tools/create-post/create-post.component";
import {PostsComponent} from "../../tools/posts/posts.component";
import {FirebaseTSFirestore, Limit, OrderBy, Where} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    PostsComponent,
    NgForOf
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})

export class PostFeedComponent implements OnInit{
  firestore=new FirebaseTSFirestore();
  posts:PostData[]=[];
  constructor(private  dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.getPosts();
    }

  onCreatePostClick() {
    this.dialog.open(CreatePostComponent)

  }

  getPosts(){
    this.firestore.getCollection({
      path:["Posts"],
      where:[
        new OrderBy("timestamp","desc"),
        new Limit(10)
      ],
      onComplete:(result)=>{
        result.docs.forEach(
          doc=>{
            let post=<PostData>doc.data();
            post.postId=doc.id
            this.posts.push(post)
          }
        )

    },
      onFail:(err)=>{

      }

    });
  }

}

export interface PostData{
  comment:string;
  creatorId:string;
  imageUrl:string;
  postId:string

}
