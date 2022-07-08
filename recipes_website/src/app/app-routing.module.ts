import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home-page', component: HomeComponent },
  { path: 'emailVerification', component: EmailVerificationComponent },
  { path: 'favourite-list', component: FavouriteListComponent },
  {path: 'recipe-page', component: RecipePageComponent},
  { path: 'add-recipe', component: AddRecipeComponent },
  {path:'search', component:SearchRecipeComponent},
  {path: 'recipe-list', component: ReceipeListComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
