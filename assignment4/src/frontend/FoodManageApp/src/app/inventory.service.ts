import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Env} from './env';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private httpClient: HttpClient
  ) { }
  getInventories(): Observable <any> {
    return this.httpClient.get<any>('http://localhost:9000/inventory');
  }
  getInventory(id): Observable <any> {
    return this.httpClient.get<any>('http://localhost:9000/inventory/' + id);
  }
  getRecommendId(): Observable <any> {
    return this.httpClient.get<any>('http://localhost:9000/recommend');
  }
}
