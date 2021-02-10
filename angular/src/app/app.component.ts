import { PageWebSiteObservableService } from './shared/observable/pageWebSite-obesrvable.service';
import { Router } from '@angular/router';
import { User } from './shared/bean/User';
import { Subscription } from 'rxjs';
import { UserObservableService } from './shared/observable/user-obesrvable.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'MyRecipesFront';

  subscription$: Subscription;
  user = new User();

  constructor(
    private userObservableService: UserObservableService,
    private pageWebSiteObservableService: PageWebSiteObservableService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userObservableService.setUserConnectSubject(JSON.parse(localStorage.getItem('user')));
    }
    this.subscription$ = this.userObservableService.getUserConnectSubject().subscribe(
      (userConnectReturn) => {
        console.log('userConnectReturn', userConnectReturn);
        this.user = userConnectReturn;
      }
    );
  }

  disconnect() {
    this.router.navigate(['/accueil']);
    this.userObservableService.setUserConnectSubject(new User());
    localStorage.removeItem('user');
    this.pageWebSiteObservableService.setPageWebSiteConnectSubject(1);
  }

  clickPublicRecipes(): void {
    this.pageWebSiteObservableService.setPageWebSiteConnectSubject(1);
    localStorage.setItem('pageWebSite', '1');
  }

  clickMyRecipes(): void {
    this.pageWebSiteObservableService.setPageWebSiteConnectSubject(2);
    localStorage.setItem('pageWebSite', '2');
  }

}