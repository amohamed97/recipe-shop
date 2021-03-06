import { ThisReceiver } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Second Recipe',
      'This is my first recipe',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 10)
      ]
    ),
    new Recipe(
      'First Recipe',
      'This is my first recipe',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636',
      [
        new Ingredient('Beans', 3),
        new Ingredient('Chicken', 1)
      ]
    ),
  ];

  recipeSelected = new EventEmitter<Recipe>();
  recipesUpdated = new EventEmitter<Recipe[]>();

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id:number){
    return this.recipes[id]
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesUpdated.emit(this.recipes.slice())
  }

  updateRecipe(index, recipe){
    this.recipes[index] = recipe
    this.recipesUpdated.emit(this.recipes.slice())
  }

  deleteRecipe(index){
    this.recipes.splice(index, 1)
    this.recipesUpdated.emit(this.recipes.slice())
  }

  setSelectedRecipe(recipe) {}
}
