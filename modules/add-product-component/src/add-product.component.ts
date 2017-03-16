import { ProductService } from '@nodeart/productservice';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import {DbAbstractionLayer} from "@nodeart/dal";

/**
 * Component that represent a form to add new products to database
 */
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  /**
   * Form object
   */
  productForm : FormGroup;
  
  /**
   * Store categories
   */
  categories = [];
  
  /**
   * Store attributes
   */
  attributes = [];

  /**
   * Store tags
   */
  tags = [];

  /**
   * User attached attributes to product
   */
  addedAttributes = [];

  /**
   * User attached tags to product
   */
  addedTags = [];

  isCategorySelected = false;
  constructor(private fb: FormBuilder, 
              private dal: DbAbstractionLayer,
              private productService: ProductService) {

    this.productForm = this.fb.group({
      name: '',
      price: '',
      imageUrl: '',
      category: '',
      attributes: {},
      tags: [],
      description: ''
    });

  }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * Add product to database
   */
  addProduct(){
    let attributes = {};
    let tags = [];
    for(let i = 0; i < this.addedAttributes.length; i++){
      let attr = this.addedAttributes[i];
      attributes[attr.id] = attr.childs;
    }
    for(let i = 0; i < this.addedTags.length; i++){
      let tag = this.addedTags[i];
      tags.push(tag.id);
    }
    this.productForm.patchValue({
      attributes:  attributes,
      tags: tags
    });
    console.log(this.productForm.controls);
    this.dal.addProduct(this.productForm.value);
  }

  /**
   * Attach attribute to product
   */
  addAttribute(){
    this.addedAttributes.push({
      id: '',
      childs: [],
      attrs: this.filterProps(this.attributes, this.addedAttributes)
    });
    console.log(this.addedAttributes);
  }

  /**
   * Attach tag to product
   */
  addTag(){
    this.addedTags.push({
      id: '',
      tags: this.filterProps(this.tags, this.addedTags)
    });
  }

  /**
   * Filter properties
   * @param props 
   * @param addedProps 
   */
  filterProps(props, addedProps){
    return props.filter(prop => {
      let flag = true;
      for (let i = 0; i < addedProps.length; i++) {
        if (prop.id !== addedProps[i].id){
          continue;
        } else {
          flag = false;
        }
      }
      if (flag) {
        return prop;
      }
    });
  }

  /**
   * Process check of attribute
   * @param attr Attribute 
   * @param valueName Attribute name
   * @param event 
   */
  check(attr, valueName: string, $event){
    if($event.target.checked){
      attr.childs.push(valueName);
    }else{
      attr.childs = attr.childs.filter(value => {
        if(value !== valueName){
          return value;
        }
      });
    }
    console.log(attr);
  }

  /**
   * Remove attribute
   * @param index Index of attribute in array
   */
  removeAttribute(index){
    this.addedAttributes.splice(index, 1);
  }

  /**
   * Remove tag
   * @param index Index of tagin array
   */
  removeTag(index){
    this.addedTags.splice(index, 1);
  }

  searchAttrValues(attrId){
    console.log(attrId);
    for(let i = 0; i < this.attributes.length; i++){
      if(this.attributes[i].id == attrId){
        return this.attributes[i].childs;
      }
    }
  }

  /**
   * Get tags by category
   * @param event 
   */
  getTags($event){
    let categoryId = $event.target.value;
    console.log(categoryId);
      this.productService.getCategory(categoryId).subscribe( data => {
      if(data.val()){
        console.log("Attrs ids:");
        console.log(data.val());
        let ids = data.val()[0]['_source']['tags'];
        let queryObject = {
            query: {
                bool: {
                  should: []
                }
            }
        };
        // add OR matches to find all attributes 
        for(let i = 0; i < ids.length; i++){
          queryObject.query.bool.should.push({
            match: {
              "_id": ids[i]
            }
          })
        }
        this.dal.getTags(queryObject).subscribe( data => {
          if(data.val()){
            console.log("Final data: ");
            this.tags = data.val().map(item => {
              item['_source']['id'] = item['_id'];
              return item['_source'];
            });
            console.log(this.tags);
          }
        });
        this.isCategorySelected = true;
      }
    });
  }

  /**
   * Get attributes by category
   * @param event 
   */
  getAttributes($event){
    let categoryId = $event.target.value;
    console.log(categoryId);
      this.productService.getCategory(categoryId).subscribe( data => {
      if(data.val()){
        console.log("Attrs ids:");
        console.log(data.val());
        let ids = data.val()[0]['_source']['attrs'];
        let queryObject = {
            query: {
                bool: {
                  should: []
                }
            }
        };
        // add OR matches to find all attributes 
        for(let i = 0; i < ids.length; i++){
          queryObject.query.bool.should.push({
            match: {
              "_id": ids[i]
            }
          })
        }
        this.dal.getAttributes(queryObject).subscribe( data => {
          if(data.val()){
            console.log("Final data: ");
            this.attributes = data.val().map(item => {
              item['_source']['id'] = item['_id'];
              return item['_source'];
            });
            console.log(this.attributes);
          }
        });
        this.isCategorySelected = true;
      }
    });
  }

  /**
   * Get properties (attributes, tags)
   * @param event 
   */
  getProps($event){
    this.getAttributes($event);
    this.getTags($event);
  }

  /**
   * Get categories
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

}
