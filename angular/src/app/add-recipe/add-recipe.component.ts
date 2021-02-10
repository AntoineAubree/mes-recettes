import { UserObservableService } from './../shared/observable/user-obesrvable.service';
import { DifficultyWebService } from './../shared/webService/difficulty.webservice';
import { Unity } from './../shared/bean/Unity';
import { UnityWebService } from './../shared/webService/unity.webservice';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { IngredientWebService } from './../shared/webService/ingredient.webservice';
import { Ingredient } from './../shared/bean/Ingredient';
import { RecipeWebService } from './../shared/webService/recipe.webservice';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from './../shared/bean/Recipe';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Difficulty } from '../shared/bean/Difficulty';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  subscription$: Subscription;
  recipeSubmit = new FormData();
  allIngredients = new Array<Ingredient>();
  allUnitys = new Array<Unity>();
  allDifficultys = new Array<Difficulty>();
  idUser: number;

  addRecipeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cookingTime: new FormControl('00:00', [Validators.required]),
    preparationTime: new FormControl('00:00', [Validators.required]),
    recipePublic: new FormControl(false),
    difficulty: new FormGroup({
      id: new FormControl('', [Validators.required]),
    }),
    user: new FormGroup({
      id: new FormControl(),
    }),
    numberOfPeople: new FormControl('4', [Validators.required, Validators.min(1)]),
    steps: new FormArray([
    ]),
    ingredientsRecipe: new FormArray([
    ])
  });

  numberOfPeople = this.addRecipeForm.get('numberOfPeople') as FormControl;
  @ViewChild('inputRecipeNumberOfPeople') inputRecipeNumberOfPeople: ElementRef<HTMLInputElement>;
  imageName = '';
  user = this.addRecipeForm.get('user') as FormGroup;
  steps = this.addRecipeForm.get('steps') as FormArray;
  ingredientChipControl = new FormControl();
  filteredIngredients: Observable<Ingredient[]>;
  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  ingredientsRecipe = this.addRecipeForm.get('ingredientsRecipe') as FormArray;
  recipePublic = false;
  recipePublicMessage = 'Recette visible uniquement depuis votre espace personnel';

  constructor(
    private recipeWebService: RecipeWebService,
    private ingredientWebService: IngredientWebService,
    private unityWebService: UnityWebService,
    private difficultyWebService: DifficultyWebService,
    private _snackBar: MatSnackBar,
    private userObservableService: UserObservableService,
  ) {
    this.filteredIngredients = this.ingredientChipControl.valueChanges.pipe(
      map((ingredient: Ingredient | null) => ingredient ? this._filter(ingredient) : this.allIngredients.slice()));
  }

  ngOnInit(): void {
    this.addStep(0);
    this.subscription$ = this.userObservableService.getUserConnectSubject().subscribe(
      (userReturn) => {
        this.idUser = userReturn.id;
      }
    );
    this.getAllUnitysFromBack();
    this.getAllIngredientsFromBack();
    this.getAllDifficultysFromBack();
  }

  getAllDifficultysFromBack(): void {
    this.difficultyWebService.getAllDifficultysBack().subscribe(
      (listDifficultysBack) => {
        console.log('listDifficultysBack', listDifficultysBack);
        this.allDifficultys = listDifficultysBack;
      }
    );
  }

  getAllUnitysFromBack(): void {
    this.unityWebService.getAllUnitysBack().subscribe(
      (listUnitysBack) => {
        console.log('listUnitysBack', listUnitysBack);
        this.allUnitys = listUnitysBack;
      }
    );
  }

  getAllIngredientsFromBack(): void {
    this.ingredientWebService.getAllIngredientsBack().subscribe(
      (listIngredientsBack) => {
        console.log('listIngredientsBack', listIngredientsBack);
        this.allIngredients = listIngredientsBack;
      }
    );
  }

  onFileChanged(event): void {
    this.recipeSubmit.append('imageFile', event.target.files[0], event.target.files[0].name);
    this.imageName = event.target.files[0].name;
  }

  addStep(indexStep: number) {
    this.steps.insert((indexStep), new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      orderStep: new FormControl(),
    }));
  }

  removeStep(indexStep: number) {
    this.steps.removeAt(indexStep);
  }

  private _filter(ingredientValue: Ingredient): Ingredient[] {
    const filterValue = ingredientValue;
    return this.allIngredients.filter(ingredient => ingredient.value.toLowerCase().indexOf(filterValue.toString().toLowerCase()) === 0);
  }

  selectedIngredient(event: any): void {
    this.ingredientInput.nativeElement.value = '';
    this.ingredientChipControl.setValue('');
    this.addIngredientRecipe(event);
  }

  addIngredientRecipe(ingredient: Ingredient) {
    this.ingredientsRecipe.push(new FormGroup({
      ingredient: new FormGroup(
        {
          value: new FormControl(ingredient.value),
          id: new FormControl(ingredient.id),
        }
      ),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)]),
      unity: new FormGroup(
        {
          id: new FormControl(null, [Validators.required]),
        }
      )
    })
    );
  }

  removeIngredient(index: number): void {
    this.ingredientsRecipe.removeAt(index);
  }

  onSubmit() {
    this.reorderSteps();
    this.user.get('id').setValue(this.idUser);
    this.addRecipeForm.get('cookingTime').setValue(this.convertTimeToNumber(this.addRecipeForm.get('cookingTime').value))
    this.addRecipeForm.get('preparationTime').setValue(this.convertTimeToNumber(this.addRecipeForm.get('preparationTime').value))
    this.recipeSubmit.append('recipe', JSON.stringify(this.addRecipeForm.value));
    this.addRecipe(this.recipeSubmit);
  }

  convertTimeToNumber(recipeTime: string): number {
    let recipeTimeHour = recipeTime.substring(0, 2);
    let recipeTimeMinute = recipeTime.substring(3, 5);
    return (Number.parseInt(recipeTimeHour) * 60 + Number.parseInt(recipeTimeMinute));
  }

  reorderSteps(): void {
    for (let i = 0; i < this.steps.length; i++) {
      this.steps.at(i).patchValue({
        orderStep: i + 1
      })
    }
  }

  addPerson() {
    let numberNumberOfPeople: number = +this.numberOfPeople.value;
    if (numberNumberOfPeople >= 0) {
      this.numberOfPeople.setValue(numberNumberOfPeople + 1);
    } else {
      this.numberOfPeople.setValue(0);
    }
    this.inputRecipeNumberOfPeople.nativeElement.value = this.numberOfPeople.value;
  }

  removePerson() {
    let numberNumberOfPeople: number = +this.numberOfPeople.value;
    if (numberNumberOfPeople > 0) {
      this.numberOfPeople.setValue(numberNumberOfPeople - 1);
    } else {
      this.numberOfPeople.setValue(0);
    }
    this.inputRecipeNumberOfPeople.nativeElement.value = this.numberOfPeople.value;
  }

  recipePublicChage(): void {
    if (this.recipePublic) {
      this.recipePublic = false;
      this.recipePublicMessage = 'Recette visible uniquement depuis votre espace personnel';
    } else {
      this.recipePublic = true;
      this.recipePublicMessage = 'Recette visible par tous';
    }
  }

  addRecipe(recipeSubmit: FormData): void {
    console.log('recipe', recipeSubmit.get('recipe'));
    console.log('imageFile', recipeSubmit.get('imageFile'));
    this.recipeWebService.addRecipeBack(recipeSubmit).subscribe(
      (recipeBack) => {
        console.log('recipeBack', recipeBack);
        if (recipeBack) {
          this.openSnackBar(recipeBack.name);
        }
      }
    );
  }

  openSnackBar(name: string): void {
    this._snackBar.open('La recette a bien été ajoutée', 'Fermer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['app-green-snackbar']
    });
  }

  counter(i: number) {
    return new Array(i);
  }
}
