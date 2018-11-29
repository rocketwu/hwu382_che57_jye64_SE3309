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
  constructor(
    private inventoryService: InventoryService
  ) {
    this.renderInventories();
  }
  renderInventories() {
    this.inventoryService.getInventories().subscribe((data) => {
      this.inventories = data['result'];
    });
    // console.log(this.inventoryService.getInventories());
    // this.inventories = this.inventoryService.getInventories();
  }

  ngOnInit() {
  }

}
