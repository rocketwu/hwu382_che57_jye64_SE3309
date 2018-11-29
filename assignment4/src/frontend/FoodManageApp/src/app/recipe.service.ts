import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(
    private httpClient: HttpClient
  ) { }
  getRecipes() {
    return this.httpClient.get('http://localhost:9000/');
  }
}
