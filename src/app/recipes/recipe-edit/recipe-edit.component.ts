import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  id: number;
  editMode: boolean = false;
  recipesSubscription: Subscription;
  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipesSubscription =  this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (params['id'] != null) {
        this.editMode = true;
      }
      this.initForm();
    });
  }

  ngOnDestroy(): void{
    this.recipesSubscription.unsubscribe()
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['recipeImg'],
      this.recipeForm.value['ingredients']
    )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, recipe)
    }else{
      this.recipeService.addRecipe(recipe)
    }
    this.onCancelEdit()
  }

  onAddIngredientCtrl() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.ingredientFormGroup()
    );
  }

  onDeleteIngredient(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onCancelEdit(){
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let description = '';
    let ingredients: FormArray = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.push(
            this.ingredientFormGroup(ingredient.name, ingredient.amount)
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      recipeImg: new FormControl(recipeImg, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  private ingredientFormGroup(
    name: string = null,
    amount: number = null
  ): FormGroup {
    return new FormGroup({
      name: new FormControl(name, [Validators.required]),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
