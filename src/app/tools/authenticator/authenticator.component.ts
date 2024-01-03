import {Component, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {FirebaseTSAuth} from "firebasets/firebasetsAuth/firebaseTSAuth";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {NgxCaptchaModule} from "ngx-captcha";
import {ReCaptcha2Component} from "ngx-captcha";

@Component({
  selector: 'app-authenticator',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgxCaptchaModule
  ],
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  state=AuthenticatorCompState.LOGIN
  firebaseAuth:FirebaseTSAuth;
  captchaVerified = false;
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  constructor(private bottomsheetRef:MatBottomSheetRef) {
    this.firebaseAuth=new FirebaseTSAuth()
  }
  onForgotPassword() {
    this.state=AuthenticatorCompState.FORGOT_PASSWORD
  }

  onLogin() {
    this.state=AuthenticatorCompState.LOGIN
  }

  onSignUP() {
    this.state=AuthenticatorCompState.SIGNUP
  }
  isLoginState(){
    return this.state==AuthenticatorCompState.LOGIN
  }
  isSignUpState(){
    return this.state==AuthenticatorCompState.SIGNUP

  }
  isForgotPasswordState(){
    return this.state==AuthenticatorCompState.FORGOT_PASSWORD

  }
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.SIGNUP:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }

  onSignUpClick(registerEmail: HTMLInputElement, registerPassword: HTMLInputElement, registerConfirmPassword: HTMLInputElement) {
    let email=registerEmail.value;
    let password=registerPassword.value;
    let confirmPassword=registerConfirmPassword.value;

    if(this.isNotEmpty(email) && this.isNotEmpty(password) && this.isNotEmpty(confirmPassword) && this.isAMatch(password,confirmPassword) ){

      this.firebaseAuth.createAccountWith(
        {
          email:email,
          password:password,
          onComplete:(uc)=>{
            this.bottomsheetRef.dismiss()
            registerEmail.value="";
            registerPassword.value="";
            registerConfirmPassword.value="";
          },
          onFail:(err)=>{
            alert("Failed to Create the Account !");
          }
        }
      )

    }


  }
  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }

  onLoginClick(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement) {
    let email=loginEmail.value;
    let password=loginPassword.value;

    if(this.isNotEmpty(email)&& this.isNotEmpty(password)){
      this.firebaseAuth.signInWith({
        email:email,
        password:password,
        onComplete:(uc)=>{
          this.bottomsheetRef.dismiss()

        },
        onFail:(err)=>{
          alert(err);
        }
      })

    }

  }

  onForgotPasswordClick(resetEmail: HTMLInputElement) {
    let email=resetEmail.value
    if(this.isNotEmpty(email)){
      this.firebaseAuth.sendPasswordResetEmail({
        email:email,
        onComplete:(err)=>{
          alert("Reset Email Sent..")
      }
      }
      )
    }

  }

  onCaptchSuccess(event: string) {
    this.captchaVerified=true

  }
}

export enum AuthenticatorCompState{
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD
}
