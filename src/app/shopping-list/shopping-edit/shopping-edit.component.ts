import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f') slForm: NgForm;
  editingSubscription: Subscription;
  editingMode: boolean = false;
  editingItemIndex: number;
  editingItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe(
      (ind) => {
        this.editingMode = true;
        this.editingItemIndex = ind;
        this.editingItem = this.shoppingListService.getIngredientByIndex(ind);
        this.slForm.form.patchValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        })
      }
    );
  }

  submitForm(form: NgForm) {
    const formValue = form.value;
    const ingredientName = formValue.name;
    const ingredientAmount = formValue.amount;
    if(this.editingMode){
      this.shoppingListService.updateIngredient(
        this.editingItemIndex,ingredientName, ingredientAmount
      );
    }else{
      this.shoppingListService.addIngredient(
        new Ingredient(ingredientName, ingredientAmount)
      );
    }
  }

  stopEditing(){
    this.slForm.reset();
    this.editingMode = false;
  }

  deleteItem(){
    this.shoppingListService.deleteIngredient(this.editingItemIndex)
    this.stopEditing()
  }
}
