import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { WishedDishComponent } from './wished-dish/wished-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    RecipeComponent,
    RecipeDetailComponent,
    InventoryDetailComponent,
    WishedDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
