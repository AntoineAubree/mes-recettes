import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PageWebSiteObservableService {

    pageWebSiteConnectBehaviorSubject$ = new BehaviorSubject<number>(0);

    getPageWebSiteConnectSubject(): Observable<number> {
        if (this.pageWebSiteConnectBehaviorSubject$.observers.length === 0) {
            this.pageWebSiteConnectBehaviorSubject$.observers.splice(0,  1);
            return this.pageWebSiteConnectBehaviorSubject$.asObservable();
        } else if (this.pageWebSiteConnectBehaviorSubject$.observers.length === 1) {
            this.pageWebSiteConnectBehaviorSubject$.observers.splice(0, 1);
            return this.pageWebSiteConnectBehaviorSubject$.asObservable();
        }
    }

    setPageWebSiteConnectSubject(pageWebSite: number): void {
        this.pageWebSiteConnectBehaviorSubject$.next(pageWebSite);
    }

}