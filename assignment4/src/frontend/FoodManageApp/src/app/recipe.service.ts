import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
