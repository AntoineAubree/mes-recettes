import { Recipe } from './../bean/Recipe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipeWebService {

    baseUrl = 'http://localhost:8080/recipe/';

    constructor(private http: HttpClient) { }

    getLastRecipesBack(): Observable<any> {
        return this.http.get<Array<Recipe>>(this.baseUrl + 'getlast/');
    }

    getAllPublicRecipesBack(indexPage: number): Observable<any> {
        return this.http.get<Array<Recipe>>(this.baseUrl + 'public/getall/' + indexPage + '/');
    }
    
    getAllMyRecipesBack(indexPage: number, idUser: number): Observable<any> {
        return this.http.get<Array<Recipe>>(this.baseUrl + 'getall/' + indexPage + '/' + idUser + '/');
    }
    
    getAllRecipesSoughtBack(recipeSought: string, indexPage: number, idUser: number): Observable<any> {
        return this.http.get<Array<Recipe>>(this.baseUrl + 'getsought/' + recipeSought + '/' + indexPage + '/' + idUser + '/');
    }

    getPublicRecipesSoughtBack(recipeSought: string, indexPage: number): Observable<any> {
        return this.http.get<Array<Recipe>>(this.baseUrl + 'getsought/' + recipeSought + '/' + indexPage + '/');
    }

    addRecipeBack(recipeSubmit: FormData): Observable<Recipe> {
        return this.http.post<Recipe>(this.baseUrl + 'add/', recipeSubmit);
    }

}
