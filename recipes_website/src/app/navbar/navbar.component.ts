import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../tool/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  auth = new FirebaseTSAuth();

  loggedIn(){
    return this.auth.isSignedIn();
  }

  data:any = '';

  onSelect(category:any){
    this.data = category;
    this.router.navigateByUrl('/recipe-list', { state: this.data });
  }
  ngOnInit(): void {
  }

  onGetStartedClick(){

    this.loginSheet.open(AuthenticatorComponent);
  }
  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
            },
            whenSignedOut: user => {
              this.router.navigate([""]);
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user=> {

            },
            whenChanged: user => {

            }
          }
        )
      }
    )
   }

   onLogoutClick(){
     this.auth.signOut();

   }

   onNewRecipeClick(){
    this.router.navigate(["add-recipe"]);
   }


   categories: string[] = ['Apkepai', 'Blynai', 'Desertai', 'Gėrimai', 'Karšti patiekalai', 'Uogienės', 'Konservuoti patiekalai', 'Košės','Kremai, padažai', 'Picos', 'Pyragai, kepiniai', 'Salotos, mišrainės', 'Sriubos', 'Sumuštiniai', 'Troškiniai', 'Užkandžiai', 'Vegetarški' ];
}
