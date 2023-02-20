import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  form = new FormGroup({
    name: new FormControl(''),
    imagePath: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormArray(<FormGroup[]>[])
  });

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.setRecipeInForm();
      }
    })
  }

  private setRecipeInForm() {
    const recipe = this.recipeService.getRecipe(this.id);
    this.form.get('name')?.setValue(recipe.name);
    this.form.get('imagePath')?.setValue(recipe.imagePath);
    this.form.get('description')?.setValue(recipe.description);
    recipe.ingredients.forEach(ingredient => this.ingredientsGroup.push(
      new FormGroup({
        'name': new FormControl(ingredient.name, Validators.required),
        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      })
    ));
  }

  onSubmit() {
    const recipe = this.form.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    this.ingredientsGroup.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }));
  }

  onRemoveIngredient(index: number) {
    this.ingredientsGroup.removeAt(index);
  }

  get ingredientsGroup() {
    return (<FormArray>this.form.get('ingredients'));
  }

}
