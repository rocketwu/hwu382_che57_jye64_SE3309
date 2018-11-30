import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {
  private inventoryName;
  private recipes;
  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.renderInventory();
  }

  ngOnInit() {
  }
  renderInventory() {
    this.route.params.subscribe((params) => {
      this.inventoryService.getInventory(params['id']).subscribe((data) => {
        if (data['result'] !== []) {
          alert('No related recipes');
          this.location.back();
        }this.inventoryName = data['result'][0]['name'];
        this.recipes = data['result'];
        console.log(this.recipes);
      });
    });
  }
}
