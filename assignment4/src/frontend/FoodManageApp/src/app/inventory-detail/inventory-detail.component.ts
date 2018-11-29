import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {
  private inventory;
  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  renderInventory() {
    this.route.params.subscribe((params) => {
      this.inventoryService.getInventory(params['id']).subscribe((data) => {
        this.inventory = data;
      });
    });
  }
}
