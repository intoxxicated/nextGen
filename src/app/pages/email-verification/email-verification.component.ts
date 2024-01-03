import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit{
  auth=new FirebaseTSAuth()
    ngOnInit(): void {
    // @ts-ignore
      if(this.auth.isSignedIn()&& !this.auth.getAuth().currentUser.emailVerified){
      this.auth.sendVerificationEmail()
    }
    else {
      this.router.navigate(['']);
    }
    }

    constructor(private router:Router) {
    }
    onResendClick(){
    this.auth.sendVerificationEmail()
    }
}
