import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RecipesPageComponent } from './recipes-page/recipes-page.component';
import { FooterComponent } from './footer/footer.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component'; 
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from './api.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from "./shared/services/auth.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
export const firebaseConfig = {
  apiKey: "AIzaSyBvegPIpAyAMui0rUPmIPWBaBQfTkhLXp4",
  authDomain: "recipes-6824d.firebaseapp.com",
  projectId: "recipes-6824d",
  storageBucket: "recipes-6824d.appspot.com",
  messagingSenderId: "405341778676",
  appId: "1:405341778676:web:35ab659a9acb747ee364a1",
  measurementId: "G-N06LQRGR78"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    RecipesPageComponent,
    FooterComponent,
    RecipeTileComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VerifyEmailComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
