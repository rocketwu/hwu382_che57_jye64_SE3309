import { Component, OnInit } from '@angular/core';
import {WisheddishService} from '../wisheddish.service';

@Component({
  selector: 'app-wished-dish',
  templateUrl: './wished-dish.component.html',
  styleUrls: ['./wished-dish.component.css']
})
export class WishedDishComponent implements OnInit {
  private wishedDishes;
  constructor(
    private wishedDishService: WisheddishService
  ) {
    this.renderWishedDishes();
  }

  ngOnInit() {
  }

  renderWishedDishes() {
    this.wishedDishService.getWishedDish().subscribe((data) => {
      this.wishedDishes = data['result'];
    });
  }
}
