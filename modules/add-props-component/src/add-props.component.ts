import { ProductService } from '@nodeart/productservice';
import { DbAbstractionLayer } from '@nodeart/dal/index';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 * Component that represent a form to add new properties
 */
@Component({
  selector: 'app-add-props',
  templateUrl: './add-props.component.html',
  styleUrls: ['./add-props.component.scss']
})
export class AddPropsComponent implements OnInit {

  /**
   * Properties available to add
   */
  propOptions = ['', 'category', 'attribute', 'tag'];
  
  /**
   * New category form
   */
  categoryForm: FormGroup;

  /**
   * New attribute form
   */
  attributeForm: FormGroup;

  /**
   * New tag form
   */
  tagForm: FormGroup;

  /**
   * Selected property to add
   */
  selectValue = "";

  /**
   * Product categories
   */
  categories = [];

  /**
   * Added properties
   */
  addedChilds = [];

  constructor(protected fb: FormBuilder, protected dal: DbAbstractionLayer, protected productService: ProductService) {
    this.categoryForm = fb.group({
      name: '',
      tags: [],
      attrs: [],
      parentCategory: '1'
    });
    this.attributeForm = fb.group({
      name: '',
      desc: '',
      childs: []
    });
    this.tagForm = fb.group({
      name: '',
      desc: ''
    });
   }


  ngOnInit() {
    this.getCategories();
  }

  /**
   * Add new category
   */
  addCategory(){
    this.categoryForm.patchValue({
      tags: ['1234', '1234'],
      attrs: ['1234', '1234']
    });
    this.dal.addCategory(this.categoryForm);
  }
  
  /**
   * On change selected category to add clean forms
   */
  change(){
    this.categoryForm.patchValue({
      name: '',
      tags: [],
      attrs: []
    });
    this.attributeForm.patchValue({
      name: '',
      desc: '',
      childs: []
    });
  }

  /**
   * Add new attribute to category by categoryId
   * @param categoryId category id
   */
  addAttribute(categoryId){
    this.attributeForm.patchValue({
      childs: this.addedChilds
    });
    this.dal.addAttribute(this.attributeForm, categoryId);
  }

  /**
   * Add new tag to category by categoryId
   * @param categoryId category id
   */
  addTag(categoryId){
    this.dal.addTag(this.tagForm, categoryId);
  }

  /**
   * Get categories from db
   */
  getCategories(){
    this.productService.getCategories().subscribe( data => {
      if(data.val()) {
        this.categories = data.val().map(item => {
              item['_source']['id'] = item['_id'];
              return item['_source'];
        });
      }
    });
  }

  /**
   * Add new child to new properties
   */
  addChild(){
    this.addedChilds.push({
      key: '',
      name: ''
    });
  }

  /**
   * Remove child form addedChilds array
   * @param index index in addedChilds array
   */
  removeChild(index){
    this.addedChilds.splice(index, 1);
  }
}
