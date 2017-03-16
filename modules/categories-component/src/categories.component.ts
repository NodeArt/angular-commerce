import { Router } from '@angular/router';
import { ProductService } from '@nodeart/productservice';
import { Component, OnInit } from '@angular/core';

/**
 * Categories component. Display list of store categories
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  /**
   * Store categories
   */
  public categories = [];

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Get categories and patch to variable
   */
  getCategories(): void {
    this.productService.getCategories().subscribe( categories => {
      if(categories.val()){
        this.categories = categories.val().map(category => {
          category['_source']['id'] = category['_id'];
          return category['_source'];
        });
      }
    });
  }

  /**
   * On select category navigate to specific category
   * @param categoryId category id
   */
  onSelect(categoryId){
    this.router.navigate(['category', categoryId]);
  }

}
