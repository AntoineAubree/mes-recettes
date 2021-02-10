import { User } from '../bean/User';
import { Unity } from '../bean/Unity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserWebService {

    baseUrl = 'http://localhost:8080/user/';

    constructor(private http: HttpClient) { }

    addUserBack(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + 'add/', user);
    }

    getUserBack(user: User): Observable<User> {
        return this.http.post<User>(this.baseUrl + 'get/', user);
    }

}