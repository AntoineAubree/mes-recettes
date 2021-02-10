import { Unity } from './../bean/Unity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UnityWebService {

    baseUrl = 'http://localhost:8080/unity/';

    constructor(private http: HttpClient) { }

    getAllUnitysBack(): Observable<any> {
        return this.http.get<Array<Unity>>(this.baseUrl + 'getAll/');
    }

}