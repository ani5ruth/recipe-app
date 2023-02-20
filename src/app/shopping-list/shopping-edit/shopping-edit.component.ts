import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  editMode = false;
  editModeSub: Subscription;
  editId: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.editModeSub = this.shoppingListService.editModeSubject.subscribe((id) => {
      this.editMode = true;
      this.editId = id;
      this.editItem = this.shoppingListService.getIngredient(id);
      this.form.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.editModeSub.unsubscribe();
  }

  onSubmit() {
    const value = this.form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editId);
    this.form.reset();
    this.editMode = false;
  }

  onClear() {
    this.form.reset();
  }

}
