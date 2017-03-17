import {Component, OnInit, NgZone} from '@angular/core';
import {ProductService} from "@nodeart/productservice";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BasketService} from "@nodeart/basketservice";

/**
 * Component that represent product page
 */
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  /**
   * Id of product
   */
  id: string;

  /**
   * Product data
   */
  product;

  /**
   * Product attributes
   */
  attributes = [];

  /**
   * Product tags
   */
  tags = [];

  /**
   * Attributes that user must choose
   */
  attributesToChoose = [];

  /**
   * Is user authorized
   */
  isAuth = false;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private basket: BasketService,
              protected zone: NgZone,
              protected router: Router){
    if( basket.userId && basket.userId !== 'guest' ) {
      this.isAuth = true;
    }
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.productService.getOneProduct(this.id).subscribe( product => {
        if(product.val()){
          console.log(product.val());
          this.zone.run(() => {
            this.product = product.val()[0]['_source'];
            this.product['id'] = product.val()[0]['_id'];
          });
          this.getAttributes();
          this.getTags();
        }
      });

    });

  }

  ngOnInit() {

  }


  /**
   * Get attributes of product
   */
  private getAttributes(){
    let attributes = this.product['attributes'];
    if(attributes){
      for(let attrId in attributes){
      if(attributes.hasOwnProperty(attrId)){
        let attributeChilds = this.product['attributes'][attrId];
        this.productService.getOneAttribute(attrId).subscribe( attribute => {
          if(attribute.val()){
            let attributeObj = {
              id: '',
              name: '',
              childNames: []
            };
            attributeObj['id'] = attribute.val()[0]['_id'];
            attribute = attribute.val()[0]['_source'];
            attributeObj['name'] = attribute.name;
            for (let i = 0; i < attributeChilds.length; i++){
              let childKey = attributeChilds[i];
              for(let j = 0; j < attribute.childs.length; j++){
                if(childKey === attribute.childs[j].key){
                  attributeObj.childNames.push({
                    name: attribute.childs[j].name,
                    key: attribute.childs[j].key
                  });
                }
              }
            }
            this.zone.run(() => {
              this.attributes.push(attributeObj);
              if(attributeObj.childNames.length > 1){
                attributeObj['selectedValue'] = attributeObj.childNames[0].key;
                this.attributesToChoose.push(attributeObj);
              }
            });
            
            console.log(this.attributesToChoose);
          }
        });
      }
    }
    }
    
  }

  /**
   * Get tags of product
   */
  private getTags(){
    let tags = this.product['tags'];
    if(tags){
      for (let i = 0; i < tags.length; i++){
      this.productService.getOneTag(tags[i]).subscribe( data => {
        if(data.val()){
          let tag = data.val()[0]['_source'];
          this.zone.run(() => {
            this.tags.push(tag);
          });
        }
      });
    }
    }
  }

  /**
   * Set value of selected attribute
   * @param index index in {@link attributesToChoose}
   * @param value 
   */
  changedAttrSelect(index, value){
    this.attributesToChoose[index]['selectedValue'] = value;
  }

  /**
   * Add product to basket
   */
  buyProduct(){
    let buyObj = {
      id: this.id,
      fullId: this.id + "?",
      attributes: []
    };
    buyObj.attributes = this.attributesToChoose.map(item => {
      let obj = {
        id: item.id,
        name: item.name,
        value: item.selectedValue
      };
      buyObj.fullId += "" + obj.id + "=" + obj.value + ";";
      return obj;
    });
    this.basket.addProduct(buyObj);
  }

  /**
   * Redirect to login page
   */
  login(){
    this.router.navigate(['login']);
  }

}
