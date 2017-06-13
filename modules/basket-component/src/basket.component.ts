import { BasketService } from '@nodeart/basketservice/index';
import { DbAbstractionLayer } from '@nodeart/dal/index';
import {Component, OnInit, OnChanges, SimpleChanges, NgZone} from '@angular/core';
import { Router } from '@angular/router';

/**
 * Represent store basket. Inject basket service that get methods and data to work with database 
 */
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  /**
   * Basket products
   */
  public products = [];

  /**
   * Total products price
   */
  public totalPrice = 0;
  constructor(protected basketService: BasketService, protected zone: NgZone, protected router: Router) {
    this.basketService.products.subscribe(data => {
      let products = JSON.parse(JSON.stringify(data));
      this.totalPrice = this.basketService.totalPrice;
      this.zone.run(() => {
        this.products = products;
      });
    });
    this.basketService.updateProducts();
   }

  ngOnInit() {
    
  }

  /**
   * 
   * @param item basketProduct
   */
  removeProduct(item){
    this.basketService.removeAllProductItems(item);
  }

  /**
   * Redirect to payment page
   */
  buy(){
    this.router.navigate(['payments']);
  }

  /**
   * Increment number of specific product
   * @param productIndex index of product in array
   */
  incItems(productIndex) {
    let newProduct = this.products[productIndex];
    let newProductObj = {
      id: newProduct.id,
      fullId: newProduct.fullId,
      attributes: []
    };
    if(newProduct.attributes){
      newProductObj.attributes = newProduct.attributes;
    }
    this.basketService.addProduct(newProductObj);
  }

  /**
   * Decrement number of specific product
   * @param productIndex index of product in array
   */
  decItems(productIndex) {
    this.basketService.removeProduct(this.products[productIndex]);
  }


}
