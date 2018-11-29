import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Env} from './env';

@Injectable({
  providedIn: 'root'
})
export class WisheddishService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getWishedDish() {
    return this.httpClient.get('http://localhost:9000/wisheddish');
  }
}
