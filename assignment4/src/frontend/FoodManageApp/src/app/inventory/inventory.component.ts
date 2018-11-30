import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [InventoryService]
})
export class InventoryComponent implements OnInit {
  private inventories;
  private rID;
  constructor(
    private inventoryService: InventoryService
  ) {
    this.renderInventories();
    this.recommendRecipe();
  }
  renderInventories() {
    this.inventoryService.getInventories().subscribe((data) => {
      this.inventories = data['result'];
    });
    // console.log(this.inventoryService.getInventories());
    // this.inventories = this.inventoryService.getInventories();
  }
  recommendRecipe() {
    this.inventoryService.getRecommendId().subscribe((data) => {
      this.rID = data['result'][0]['recipeID'];
    });
  }
  ngOnInit() {
  }

}
