import { ProductService } from '@nodeart/productservice';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, NgZone, Input, EventEmitter, Output } from '@angular/core';

/**
 * Component that represent product from specific general category. User can filter product by child categories from current general category
 */
@Component({
  selector: 'app-products-general',
  templateUrl: './products-general.component.html',
  styleUrls: ['./products-general.component.scss']
})
export class ProductsGeneralComponent implements OnInit {

  /**
   * Clild category ids from general category
   */
  categoryIds = [];
  /**
   * Child categories from general category
   */
  categories = [];

  /**
   * Is all data ready
   */
  dataReady = false;
  
  /**
   * All category ids from general category
   */
  allCategoryIds;
  
  /**
   * Current page where user stay
   */
  currentPage = 1;

  /**
   * Total pages for products
   */
  totalPages = 1;

  /**
   * Number of products on page 
   */
  @Input() itemsOnPage = 100;

  /**
   * From what product start
   */
  from = 0;
  /**
   * RxJs Subject of current page
   */
  currentPageStream = new Subject<number>();

  /**
   * Id of general category
   */
  @Input() generalCategoryId;

  @Output() categoryUpdated = new EventEmitter();
  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected productService: ProductService,
              protected zone: NgZone) { 
              
              }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if(params['id']){
        this.generalCategoryId = params['id'];
      }
      this.getCategoryIds(this.generalCategoryId);
    });
    this.currentPageStream.subscribe(newPage => {
      this.from = (this.currentPage - 1) * this.itemsOnPage;
    });
  }

  /**
   * Get child category ids from general category
   * @param generalCategoryId  general category id
   */
  getCategoryIds(generalCategoryId){
    this.productService.getCategories(generalCategoryId).subscribe( data => {
      if(data.val()){
        console.log(data.val());
        let categories = data.val().map(category => {
          category['_source']['id'] = category['_id'];
          return category['_source'];
        });
        this.categories = categories;
        let categoryIds = categories.map(category => {
          return category['id'];
        }); 
        console.log(categoryIds);
        this.categoryIds = categoryIds;

        // get Total pages of pagination
        this.getTotalPages(this.categoryIds);

        this.allCategoryIds = categoryIds;
        if(this.categoryIds.length > 0 && this.categories.length > 0){
          this.zone.run(() => this.dataReady = true);
        }
        console.log(this.dataReady);
      }
    });
  }

  /**
   * Filter product y specific child category
   * @param categoryId category id
   */
  categoryFilter(categoryId){
    this.categoryUpdated.next(categoryId);
    if(categoryId === "all"){
      this.categoryIds = this.allCategoryIds;
    } else {
      this.categoryIds =[categoryId];
    }
    this.from = 0;
    this.currentPage = 1;
    this.totalPages = 1;
    this.getTotalPages(this.categoryIds);
    console.log(this.categoryIds);
  }

  /**
   * Increment page
   */
  inc(){
    this.currentPageStream.next(++this.currentPage);
  }

  /**
   * Decrement page
   */
  dec(){
    this.currentPageStream.next(--this.currentPage);
  }

  /**
   * Get total pages for all product or specific child categories
   * @param categoryIds array of category ids
   */
  getTotalPages(categoryIds){
    this.productService.getTotalPagesByCategoryIds(categoryIds).subscribe( data => {
      if(data.val()){
        console.log(data.val());
        let items = data.val();
        let totalPages = Math.ceil(items / this.itemsOnPage);
        this.zone.run(() => {
          this.totalPages = totalPages;
        });
      }
    });
  }

}
