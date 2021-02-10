import { ImageRecipeWebService } from './../shared/webService/imageRecipe.webservice';
import { ImageRecipe } from './../shared/bean/ImageRecipe';
import { PageWebSiteObservableService } from './../shared/observable/pageWebSite-obesrvable.service';
import { RecipeObservableService } from './../shared/observable/recipe-observable.service';
import { DialogRecipeComponent } from './../shared/component/dialog-recipe/dialog-recipe.component';
import { FormatTimeService } from './../shared/service/formatTime.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeWebService } from './../shared/webService/recipe.webservice';
import { Recipe } from './../shared/bean/Recipe';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  subscription$: Subscription;
  idUser: number;
  pageWebSite: number;
  recipesSought = '';
  indexPage: number;
  listRecipes = new Array<Recipe>();
  listRecipesSize: number;
  totalPages: number;
  leftButtonDisable = true;
  rightButtonDisable = true;
  imageRecipeDefault = new ImageRecipe();

  constructor(
    private recipeWebService: RecipeWebService,
    private recipeObservableService: RecipeObservableService,
    private pageWebSiteObservableService: PageWebSiteObservableService,
    private imageRecipeWebService: ImageRecipeWebService,
    private formatTimeService: FormatTimeService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.idUser = JSON.parse(localStorage.getItem('user')).id;
    }

    if (localStorage.getItem('pageWebSite')) {
      this.pageWebSiteObservableService.setPageWebSiteConnectSubject(+localStorage.getItem('pageWebSite'));
    }

    if (localStorage.getItem('recipe')) {
      this.recipeObservableService.setRecipeSearchSubject(localStorage.getItem('recipe'));
    }

    this.imageRecipeWebService.getDefaultImageBack().subscribe(
      (imageRecipeDefaultBack) => {
        this.imageRecipeDefault = imageRecipeDefaultBack;
      }
    );

    this.recipeObservableService.getRecipeSearchSubject().subscribe(
      (recipesSoughtReturn) => {
        this.recipesSought = recipesSoughtReturn;
      }
    )

    this.pageWebSiteObservableService.getPageWebSiteConnectSubject().subscribe(
      (pageWebSiteReturn) => {
        this.pageWebSite = pageWebSiteReturn;
        this.indexPage = 0;
        this.getRecipes();
      }
    )

  }

  getRecipes(): void {
    if (this.pageWebSite === 1) {
      this.getAllPublicRecipes();
    } else if (this.pageWebSite === 2) {
      this.getAllMyRecipes();
    } else if (this.pageWebSite === 3 && this.idUser && this.recipesSought) {
      this.getAllRecipesSought();
    } else if (this.pageWebSite === 3 && this.recipesSought) {
      this.getPublicRecipesSought();
    }
  }

  getAllPublicRecipes(): void {
    this.recipeWebService.getAllPublicRecipesBack(this.indexPage).subscribe(
      (dataRecipesBack) => {
        this.updateDisplayedRecipesData(dataRecipesBack);
      }
    );
  }

  getAllMyRecipes(): void {
    this.recipeWebService.getAllMyRecipesBack(this.indexPage, this.idUser).subscribe(
      (dataRecipesBack) => {
        this.updateDisplayedRecipesData(dataRecipesBack);
      }
    );
  }

  getAllRecipesSought(): void {
    this.recipeWebService.getAllRecipesSoughtBack(this.recipesSought, this.indexPage, this.idUser).subscribe(
      (dataRecipesBack) => {
        this.updateDisplayedRecipesData(dataRecipesBack);
      }
    );
  }

  getPublicRecipesSought(): void {
    this.recipeWebService.getPublicRecipesSoughtBack(this.recipesSought, this.indexPage).subscribe(
      (dataRecipesBack) => {
        this.updateDisplayedRecipesData(dataRecipesBack);
      }
    );
  }

  updateDisplayedRecipesData(dataRecipesBack: any): void {
    console.log('dataRecipesBack', dataRecipesBack);
    this.listRecipes = dataRecipesBack.content;
    this.listRecipesSize = dataRecipesBack.totalElements;
    this.totalPages = dataRecipesBack.totalPages;
    this.checkButton();
  }

  checkButton(): void {
    if (this.indexPage === 0) {
      this.leftButtonDisable = true;
    } else {
      this.leftButtonDisable = false;
    }
    if (this.indexPage === this.totalPages - 1 || this.totalPages === 0) {
      this.rightButtonDisable = true;
    } else {
      this.rightButtonDisable = false;
    }
  }

  incrementIndexPage(): void {
    this.indexPage++;
    this.getRecipes();
  }

  decrementIndexPage(): void {
    this.indexPage--;
    this.getRecipes();
  }

  counter(i: number) {
    return new Array(i);
  }

  getFormatTime(totalTime: number): string {
    return this.formatTimeService.getFormatTimeService(totalTime);
  }

  openModal(recipe: Recipe): void {
    this.dialog.open(DialogRecipeComponent, {
      data: {
        recipeDialog: recipe,
        imageRecipeDefault: this.imageRecipeDefault
      }
    });
  }

  changeRecipePublicInDataBase(recipe: Recipe): void {
    let newRecipe = new FormData();
    newRecipe.append('recipe', JSON.stringify(recipe));
    this.recipeWebService.addRecipeBack(newRecipe).subscribe(
      (recipeBack) => {
        console.log('recipeBack', recipeBack);
      }
    );
  }

}
