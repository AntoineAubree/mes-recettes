import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { DialogRecipeComponent } from './component/dialog-recipe/dialog-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        DialogRecipeComponent
    ],
    declarations: [
        DialogRecipeComponent
    ],
    providers: [],
})
export class SharedModule { }

