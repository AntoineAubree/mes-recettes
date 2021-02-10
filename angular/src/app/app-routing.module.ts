import { RecipesComponent } from './recipes/recipes.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accueil' },
  { path: 'accueil', component: HomeComponent },
  { path: 'ajouterrecette', component: AddRecipeComponent },
  { path: 'connexion', component: ConnectionFormComponent },
  { path: 'inscription', component: RegisterFormComponent },
  { path: 'recettes', component: RecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
