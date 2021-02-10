import { Difficulty } from './../bean/Difficulty';
import { Unity } from '../bean/Unity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DifficultyWebService {

    baseUrl = 'http://localhost:8080/difficulty/';

    constructor(private http: HttpClient) { }

    getAllDifficultysBack(): Observable<any> {
        return this.http.get<Array<Difficulty>>(this.baseUrl + 'getAll/');
    }

}