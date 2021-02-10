import { Recipe } from './../shared/bean/Recipe';
import { RecipeWebService } from './../shared/webService/recipe.webservice';
import { RecipeObservableService } from './../shared/observable/recipe-observable.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = new Array<Recipe>();

  constructor( private recipeWebService: RecipeWebService) { }

  ngOnInit(): void {
    this.getLastRecipes();
  }

  getLastRecipes(): void {
    this.recipeWebService.getLastRecipesBack().subscribe(
      (lastRecipesBack)  => {
        this.slides = lastRecipesBack;
      }
    )
  }

}
