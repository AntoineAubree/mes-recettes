import { Ingredient } from './../bean/Ingredient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IngredientWebService {

    baseUrl = 'http://localhost:8080/ingredient/';

    constructor(private http: HttpClient) { }

    getAllIngredientsBack(): Observable<any> {
        return this.http.get<Array<Ingredient>>(this.baseUrl + 'getAll/');
    }

}
