import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Env} from './env';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private httpClient: HttpClient
  ) { }
  getShoppingList() {
    return this.httpClient.get('http://localhost:9000/shoppinglist');
  }
  getRecipe(id) {
    return this.httpClient.get('http://localhost:9000/recipe/' + id);
  }
  postRecipeToWishedDish(recipe) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:9000/wisheddish', recipe, {headers: headers});
  }
  deleteRecipe(id) {
    return this.httpClient.delete('http://localhost:9000/recipe/' + id);
  }
}
