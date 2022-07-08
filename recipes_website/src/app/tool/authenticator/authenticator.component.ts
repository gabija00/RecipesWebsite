import { Component, OnInit } from '@angular/core';
import {FirebaseTSAuth} from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN;
  firebaseAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef) {
    this.firebaseAuth = new FirebaseTSAuth();
   }

  onLogin(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement
    )
    {
      let email = loginEmail.value;
      let password = loginPassword.value;

      if (this.isNotEmpty(email) && this.isNotEmpty(password)){
        this.firebaseAuth.signInWith(
          {
            email : email,
            password : password,
            onComplete: (uc) => {
              this.bottomSheetRef.dismiss();
              //alert("Logged In");
            },
            onFail: (err) => {
              alert(err);
            }
          }
        )
      }

    }

  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;
    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password)&&
      this.isNotEmpty(confirmPassword)&&
      this.isAMatch(password , confirmPassword)
      ){
      this.firebaseAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();
            //alert("Acount Created");
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = "";
          },
          onFail: (err) => {
            alert("Failed to create the account.");
          }
        }
      )
    }    
  }

  onResetClick(resetEmail:HTMLInputElement){
    let email = resetEmail.value;
    if (this.isNotEmpty(email)){
      this.firebaseAuth.sendPasswordResetEmail(
        {
          email:email,
          onComplete: (err) => {
            this.bottomSheetRef.dismiss();
            //alert('Reset email sent to ${email}');
          }
        }
      )
    }
  }
  ngOnInit(): void {
  }

  isNotEmpty(text:string){
    return text != null && text.length > 0;
  }

  isAMatch(text:string, compareWith:string){
    return text == compareWith;
  }

  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Prisijungti";
      case AuthenticatorCompState.REGISTER:
        return "Registruotis";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Pamiršote slaptažodį";
    }
  }

}
export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
