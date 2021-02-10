import { UserObservableService } from './../shared/observable/user-obesrvable.service';
import { User } from './../shared/bean/User';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserWebService } from './../shared/webService/user.webservice';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  pseudoAvailable = true;
  passwordValid = false;
  confirmPassword = false;
  subscription$: Subscription;
  addRegisterForm = new FormGroup({
    id: new FormControl(),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }
    , {
      validators: this.checkPasswords,
    });

  constructor(
    private userObservableService: UserObservableService,
    private _snackBar: MatSnackBar,
    private userWebService: UserWebService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.subscription$ = this.userObservableService.getUserConnectSubject().subscribe(
      (userConnectReturn) => {
        console.log('userConnectReturn', userConnectReturn);
        if (userConnectReturn.pseudo) {
          this.addRegisterForm.get('id').setValue(userConnectReturn.id);
          this.addRegisterForm.get('pseudo').setValue(userConnectReturn.pseudo);
          this.addRegisterForm.get('password').setValue(userConnectReturn.password);
          this.addRegisterForm.get('confirmPassword').setValue(userConnectReturn.password);
        }
      }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  confirmPasswordChange(){
    if (this.addRegisterForm.get('password').valid) {
      this.passwordValid = true;
      if (this.addRegisterForm.get('password').value === this.addRegisterForm.get('confirmPassword').value) {
        this.confirmPassword = true;
      } else {
        this.confirmPassword = false;
      }
    } else {
      this.passwordValid = false;
    }
  }

  onSubmit() {
    this.userWebService.addUserBack(this.addRegisterForm.value).subscribe(
      (userBack) => {
        console.log('userBack', userBack);
        if (userBack.id === -1) {
          this.pseudoAvailable = false;
        } else {
          this.openSnackBar(userBack.pseudo);
          this.router.navigate(['/accueil']);
        }
      }
    );
  }

  openSnackBar(pseudo: string): void {
    this._snackBar.open('Votre compte a bien été créée', 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['app-green-snackbar']
    });
  }

}
