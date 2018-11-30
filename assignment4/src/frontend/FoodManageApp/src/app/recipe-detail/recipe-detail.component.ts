import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private recipe;
  private detail;
  private rName;
  private alertMsg;
  private rID;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.renderRecipe();
  }

  ngOnInit() {
  }
  renderRecipe() {
    this.route.params.subscribe((params) => {
      this.rID = params['id'];
      this.recipeService.getRecipe(params['id']).subscribe((data) => {
        this.recipe = data['result'];
        this.detail = data['result']['detail'];
        this.rName = data['result']['name'];
      });
    });
  }
  addToWishedDish(dishName, dateToEat, quantity, memberID) {
    const body = {
      'dishName': dishName,
      'dateToEat': dateToEat,
      'quantity': quantity,
      'memberID': memberID,
      'recipeID': this.rID
    };
    console.log(body);
    this.recipeService.postRecipeToWishedDish(body).subscribe((res) => {
      if (res['code'] !== 1) {
        this.alertMsg = res['msg'];
      } else {
        alert('Add successfully!');
      }
    });
  }
  deleteR() {
    this.recipeService.deleteRecipe(this.rID).subscribe((res) => {
      if (res['code'] !== 1) {
        this.alertMsg = res['msg'];
      } else {
        alert('Delete successfully!');
      }
    });
  }
}
