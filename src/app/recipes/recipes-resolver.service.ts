import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataStorageService } from '../data.storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

    resolve(_route: ActivatedRouteSnapshot) {
        const recipes = this.recipeService.getRecipes();
        return recipes.length === 0 ? this.dataStorageService.fetchRecipes() : recipes;
    }

}