import { UnityWebService } from './shared/webService/unity.webservice';
import { IngredientWebService } from './shared/webService/ingredient.webservice';
import { SharedModule } from './shared/shared.module';
import { DialogRecipeComponent } from './shared/component/dialog-recipe/dialog-recipe.component';
import { RecipeWebService } from './shared/webService/recipe.webservice';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipeObservableService } from './shared/observable/recipe-observable.service';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    SearchBarComponent,
    AddRecipeComponent,
    RegisterFormComponent,
    ConnectionFormComponent,
    RecipesComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers: [
    RecipeWebService,
    RecipeObservableService,
    IngredientWebService,
    UnityWebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
