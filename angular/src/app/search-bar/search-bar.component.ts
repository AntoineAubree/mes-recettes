import { PageWebSiteObservableService } from './../shared/observable/pageWebSite-obesrvable.service';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeObservableService } from '../shared/observable/recipe-observable.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  subscription$: Subscription;
  recipeSought: string;

  constructor(
    private recipeObservableService: RecipeObservableService,
    private pageWebSiteObservableService: PageWebSiteObservableService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('recipe')) {
      this.recipeSought = localStorage.getItem('recipe');
    }
  }

  search(recipeSought: string): void {
    if (recipeSought) {
      this.recipeObservableService.setRecipeSearchSubject(recipeSought);
      this.pageWebSiteObservableService.setPageWebSiteConnectSubject(3);
      localStorage.setItem('recipe', recipeSought);
      localStorage.setItem('pageWebSite', '3');
      this.router.navigate(['/recettes']);
    }
  }

  clear(): void {
    this.recipeSought = '';
    this.recipeObservableService.setRecipeSearchSubject(this.recipeSought);
    localStorage.removeItem('recipe');
  }

}
