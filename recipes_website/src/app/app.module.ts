import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeTileComponent } from './recipe-tile/recipe-tile.component';
import { FooterComponent } from './footer/footer.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule , AngularFirestore} from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticatorComponent } from './tool/authenticator/authenticator.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RecipeTileComponent,
    FooterComponent,
    AddRecipeComponent,
    SearchRecipeComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    RecipePageComponent,
    LoaderComponent,
    ReceipeListComponent,
    FavouriteListComponent,
    RecipeTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    //AngularFireModule.initializeApp(environment.firebase, "cloud") sitas nebutinas sita per failo bandymus ikelti pridejau
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebase);
    
  }
}
