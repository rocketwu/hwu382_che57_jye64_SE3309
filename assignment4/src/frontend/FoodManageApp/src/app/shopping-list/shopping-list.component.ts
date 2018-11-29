import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(
    private recipeService: RecipeService
  ) {
    this.renderShoppingList();
  }
  renderShoppingList() {
    this.recipeService.getShoppingList().subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit() {
  }

}
