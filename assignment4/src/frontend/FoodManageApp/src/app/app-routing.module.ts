import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoryComponent} from './inventory/inventory.component';
import {WishedDishComponent} from './wished-dish/wished-dish.component';
import {InventoryDetailComponent} from './inventory-detail/inventory-detail.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: '', component: InventoryComponent},
  {path: 'inventoryDetail/:id/:id', component: RecipeDetailComponent},
  {path: 'inventoryDetail/:id', component: InventoryDetailComponent},
  {path: 'wishedDish', component: WishedDishComponent},
  {path: 'wishedDish/shoppingList', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
