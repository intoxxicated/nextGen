import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {FirebaseTSApp} from "firebasets/firebasetsApp/firebaseTSApp";
import {environment} from "../environments/environment";
import {HomeComponent} from "./pages/home/home.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticatorComponent} from "./tools/authenticator/authenticator.component";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {NgxCaptchaModule} from "ngx-captcha"
import {ProfileComponent} from "./tools/profile/profile.component";
import {FirebaseTSFirestore} from "firebasets/firebasetsFirestore/firebaseTSFirestore";
import {HttpUserEvent} from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, ProfileComponent],
  providers:[MatBottomSheet,MatCardModule,MatButtonModule,FirebaseTSAuth,NgxCaptchaModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'nextgen';
  auth:FirebaseTSAuth;
  firestore:FirebaseTSFirestore=new FirebaseTSFirestore();
  userHasProfile=true;
  userDocument: UserDocument | undefined;
  constructor(private loginSheet: MatBottomSheet,private router:Router) {
    FirebaseTSApp.init(environment.firebaseConfig)
    this.auth=new FirebaseTSAuth()
    this.auth.listenToSignInStateChanges(
      user=>{
        this.auth.checkSignInState(
          {
            whenSignedIn:user=>{
            },
            whenSignedOut:user=>{
            },
            whenSignedInAndEmailNotVerified:user=>{
              this.router.navigate(['emailVerification'])

            },
            whenSignedInAndEmailVerified:user=>{
              this.getUserProfile();

            },
            whenChanged:user=>{

            }
          }
        )
      }
    );


  }

  ngOnInit(): void {


  }

  loggedIn(){
    return this.auth.isSignedIn()
  }
  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent)

  }

  onLogoutClick() {
    this.auth.signOut()
  }
  getUserProfile() {
    const currentUser = this.auth.getAuth().currentUser;

    if (currentUser !== null) {
      const uid = currentUser.uid;
      this.firestore.listenToDocument({
        name: "Getting Document",
        path: ["Users", uid],
        onUpdate: (result) => {
          this.userDocument=<UserDocument>result.data();

          this.userHasProfile=result.exists;
          if(this.userHasProfile){
            this.router.navigate((["postFeed"]))
          }

        }
      });
    }
  }
}

export interface UserDocument{
  publicName:string;
  description:string;
}
