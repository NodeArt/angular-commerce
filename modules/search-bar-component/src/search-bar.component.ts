import { Router } from '@angular/router';
import { ProductService } from '@nodeart/productservice/index';
import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

/**
 * Search bar component for searching products by name
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  /**
   * RxJs Subject 
   */
  inputSubject = new Subject<string>();

  /**
   * Searched products
   */
  products = [];
  
  /**
   * Name query for searching
   */
  @ViewChild('query') queryString;
  constructor(private productService: ProductService, private router: Router) { }


  ngOnInit() {
    this.inputSubject.debounceTime(500).subscribe(query => {
      this.productService.getProducts(query, 5).subscribe( data => {
        if(data.val()){
          this.products = data.val().map(product => {
            product['_source']['id'] = product['_id'];
            return product['_source'];
          });
          console.log(this.products);
        }
      });
    });
  }

  /**
   * On input name in text input
   * @param {string} query name query
   */
  change(query){
    if(query.length > 0){
      this.inputSubject.next(query);
    }else{
      this.products = [];
    }
  }

  /**
   * On select product navigate to product page
   * @param {string} productId product id
   */
  onSelect(productId){
    this.router.navigate(['product', productId]);
    this.products = [];
    this.queryString.nativeElement.value = "";
  }

}
