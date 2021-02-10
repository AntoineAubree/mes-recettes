import { RecipeObservableService } from './../shared/observable/recipe-observable.service';
import { Subscription } from 'rxjs';
import { stringify } from 'querystring';
import { UserObservableService } from './../shared/observable/user-obesrvable.service';
import { Router } from '@angular/router';
import { UserWebService } from './../shared/webService/user.webservice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {

  subscription$: Subscription;

  connectionForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private _snackBar: MatSnackBar,
    private userWebService: UserWebService,
    private router: Router,
    private userObservableService: UserObservableService,
    private recipeObservableService: RecipeObservableService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userWebService.getUserBack(this.connectionForm.value).subscribe(
      (userBack) => {
        console.log('userBack', userBack);
        if (userBack.id === -1) {
        } else {
          this.userObservableService.setUserConnectSubject(userBack);
          localStorage.setItem('user', JSON.stringify(userBack));
          this.openSnackBar(userBack.pseudo);
          this.router.navigate(['/accueil']);
        }
      }
    );
  }

  openSnackBar(pseudo: string): void {
    this._snackBar.open(pseudo + ' est connecté', 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['app-green-snackbar']
    });
  }

}
