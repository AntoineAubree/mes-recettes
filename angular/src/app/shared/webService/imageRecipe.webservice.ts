import { ImageRecipe } from './../bean/ImageRecipe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageRecipeWebService {

    baseUrl = 'http://localhost:8080/imagerecipe/';

    constructor(private http: HttpClient) { }

    getDefaultImageBack(): Observable<any> {
        return this.http.get<ImageRecipe>(this.baseUrl + 'getdefaultimage/');
    }

}
