import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shopping-list/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];
    recipesSub = new Subject<Recipe[]>();

    constructor(private shoppingListservice: ShoppingListService) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: any) {
        this.recipes.push(recipe);
        this.updateRecipesSubject();
    }

    updateRecipe(id: any, recipe: any) {
        this.recipes[id] = recipe;
        this.updateRecipesSubject();
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.updateRecipesSubject();
    }

    setRecipe(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.updateRecipesSubject();
    }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListservice.addIngredients(ingredients);
    }

    updateRecipesSubject() {
        this.recipesSub.next(this.recipes.slice());
    }

}