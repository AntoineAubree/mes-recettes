import { ImageRecipe } from './ImageRecipe';
import { User } from './User';
import { Difficulty } from './Difficulty';
import { IngredientRecipe } from './IngredientRecipe';
import { Step } from './Step';

export class Recipe {
    id: number;
    name: string;
    cookingTime: number;
    preparationTime: number;
    difficulty: Difficulty;
    numberOfPeople: number;
    imageRecipe = new ImageRecipe();
    steps = new Array<Step>();
    user = new User();
    recipePublic: boolean;
    ingredientsRecipe = new Array<IngredientRecipe>();

    constructor() {

    }

}