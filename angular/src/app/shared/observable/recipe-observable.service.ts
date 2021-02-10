import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeObservableService {

    recipeSearchBehaviorSubject$ = new BehaviorSubject<string>('');

    getRecipeSearchSubject(): Observable<string> {
        if (this.recipeSearchBehaviorSubject$.observers.length === 0) {
            this.recipeSearchBehaviorSubject$.observers.splice(0, 1);
            return this.recipeSearchBehaviorSubject$.asObservable();
        } else if (this.recipeSearchBehaviorSubject$.observers.length === 1) {
            this.recipeSearchBehaviorSubject$.observers.splice(0, 1);
            return this.recipeSearchBehaviorSubject$.asObservable();
        }
    }

    setRecipeSearchSubject(recipe: string): void {
        this.recipeSearchBehaviorSubject$.next(recipe);
    }

}
