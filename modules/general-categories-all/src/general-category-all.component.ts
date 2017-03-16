import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '@nodeart/productservice';
import { Component, OnInit, Input, NgZone, OnChanges } from '@angular/core';
import {LoadingPage} from '@nodeart/loading-indicator';

/**
 * Displays display all products from general category or products from child category. Has pagination
 * 
 */
@Component({
  selector: 'app-general-category-all',
  templateUrl: './general-category-all.component.html',
  styleUrls: ['./general-category-all.component.scss']
})
export class GeneralCategoryAllComponent extends LoadingPage implements OnInit, OnChanges  {

  /**
   * Store category ids
   */
  @Input() categoryIds;

  /**
   * From what index of product start. Default 0
   */
  @Input() from = 0;

  /**
   * How many products display. Default 10
   */
  @Input() size = 10;

  /**
   * Array of products.
   */
  products = [];
  constructor(private productService: ProductService, private zone: NgZone, private router: Router) { 
    super(true);
  }

  ngOnInit() {
    console.log(this.categoryIds);
    this.getProducts(this.categoryIds);
  }

  ngOnChanges(changes) {
    this.getProducts(this.categoryIds);
  } 

  /**
   * Get product from specific categories
   * @param categoryIds Array of category ids
   */
  getProducts(categoryIds){
    this.standby();
    this.products = [];
    console.log( categoryIds );
    console.log( "Size: " + this.size + ", From: " + this.from );
    this.productService.getProductsByCategoryIds(categoryIds, this.size, this.from).subscribe( data => {
      if(data.val()){
        let products = data.val().map(item => {
            item['_source']['id'] = item['_id'];
            return item['_source'];
        });
        console.log(products);
        this.zone.run(() => {
          this.products = products;
          this.ready();
        });
        
      }
    });
  }
  
  /**
   * Get products from specific category
   * @param categoryId category id
   */
  categoryFilter(categoryId){
    this.categoryIds = categoryId;
    this.getProducts(this.categoryIds);
  }

  /**
   * On select a product redirect to product page
   * @param id id of product
   */
  onSelect(id) {
    this.router.navigate(['product', id]);
  }

}