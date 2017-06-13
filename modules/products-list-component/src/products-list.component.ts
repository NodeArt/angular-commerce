import { Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, Input, AfterViewInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DbAbstractionLayer} from "@nodeart/dal";
import {Subject} from 'rxjs/Subject';
import {ProductService} from "@nodeart/productservice";
import {AttributesSearchComponent} from '@nodeart/attributes-search-component';
/**
 * Display products form specific category. There are two methods of passing category id: 
 * 1. Input id to categoryId variable
 * 2. Pass add route parametr, like "category/3"
 */
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  @ViewChild(AttributesSearchComponent) attrComponent: AttributesSearchComponent;

  public isProductsHasAttributes: boolean = false;

  /**
   * Products array
   */
  products: any = [];
  
  /**
   * RxJs Subject of current page
   */
  currentPageStream = new Subject<number>();

  /**
   * Current page number
   */
  currentPage = 1;

  /**
   * Total pages for products
   */
  totalPages = 1;

  /**
   * Number of products on page 
   */
  itemsOnPage = 10;

  /**
   * Attributes for category
   */
  attrs = [];

  /**
   * Tags for category
   */
  tags = [];

  /**
   * Category id
   */
  @Input() categoryId = "";

  @Input() priceRanges = [0, 100000000000000];

  constructor(protected dal: DbAbstractionLayer,
              protected router: Router, 
              protected productService: ProductService,
              protected route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      if(params['id']){
        this.categoryId = params['id'];
      }
    });
    this.getTotalPages();
    this.getProducts();
    this.currentPageStream.subscribe(newPage => {
      this.getProducts();
    });

    this.attrComponent.attrsEmiter
      .subscribe(isAttrsExist => this.isProductsHasAttributes = isAttrsExist);

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
   * On select product navigeate to product page
   * @param id product id
   */
  onSelect(id){
    this.router.navigate(['product', id]);
  }

  /**
   * Get products by category id
   */
  getProducts(){
    console.log(this.attrs);
    console.log(this.tags);
    this.productService
      .searchProducts(this.categoryId, this.priceRanges ,this.attrs, this.tags, this.itemsOnPage, (this.currentPage - 1) * this.itemsOnPage)
        .subscribe( data =>{
          if(data.val()){
            if(data.val()['total'] === 0) {
              this.products = [];
            } else if(data.val().length > 0){
              console.log('Products data: ', data.val());
              this.products = data.val().map(item => {
                item['_source']['id'] = item['_id'];
                return item['_source'];
              });
            }
          }
        });
  }

  /**
   * Filter products by attrutes and tags
   */
  filter(){
    this.currentPage = 1;
    this.getTotalPages();
    this.getProducts();
  }

  /**
   * Get total pages for product from category
   */
  getTotalPages(){
    this.productService.getTotalPages(this.categoryId, this.priceRanges, this.attrs, this.tags).subscribe( data => {
      if(data.val() >= 0){
        let items = data.val();
        items === 0 ? this.totalPages = 1 : this.totalPages = Math.ceil(items / this.itemsOnPage);
      }
    });
  }

  /**
   * Set new selected attributes
   * @param newAttrs 
   */
  updateAttrs(newAttrs){
    this.attrs = newAttrs;
  }

  /**
   * Set new selected tags
   * @param newTags 
   */
  updateTags(newTags){
    this.tags = newTags;
  }
}