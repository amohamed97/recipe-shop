import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 3)
  ];

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredientByIndex(i){
    return this.ingredients[i]
  }

  deleteIngredient(i){
    console.log(typeof i)
    this.ingredients = this.ingredients.filter((ingredient, index) => {
      return index !== i
    })
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  updateIngredient(index ,name, amount){
    console.log("helo")
    this.ingredients[index] = {
      name,
      amount
    }
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
