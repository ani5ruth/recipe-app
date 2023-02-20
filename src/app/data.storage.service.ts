import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "./recipes/recipe.model";
import { RecipeService } from "./recipes/recipe.service";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    private readonly API_URL = 'https://recipe-app-c18f9-default-rtdb.asia-southeast1.firebasedatabase.app/';

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(this.API_URL + 'recipes.json', recipes)
            .subscribe(response => console.log(response));
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(this.API_URL + 'recipes.json')
            .pipe(
                map(recipes => recipes.map(recipe => ({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }))),
                tap(recipes => this.recipeService.setRecipe(recipes))
            );
    }

}