import { User } from './../bean/User';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserObservableService {

    userConnectBehaviorSubject$ = new BehaviorSubject<User>(new User());

    getUserConnectSubject(): Observable<User> {
        return this.userConnectBehaviorSubject$.asObservable();
    }

    setUserConnectSubject(user: User): void {
        this.userConnectBehaviorSubject$.next(user);
    }

}