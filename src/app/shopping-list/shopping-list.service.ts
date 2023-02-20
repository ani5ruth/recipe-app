import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";

@Injectable()
export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Potato', 5),
    ];
    ingredientsChanged = new Subject<Ingredient[]>()
    editModeSubject = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(id: number) {
        return this.ingredients[id];
    }


    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updateIngredients();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updateIngredients()
    }

    updateIngredient(id: number, ingredient: Ingredient) {
        this.ingredients[id] = ingredient;
        this.updateIngredients();
    }

    deleteIngredient(id: number) {
        this.ingredients.splice(id, 1);
        this.updateIngredients();
    }


    private updateIngredients() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}