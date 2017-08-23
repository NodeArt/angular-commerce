import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@nodeart/productservice';
import { DbAbstractionLayer } from '@nodeart/dal';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
* Represent product filter by attributes
*/
@Component({
 selector: 'app-attributes-search',
 templateUrl: './attributes-search.component.html',
 styleUrls: ['./attributes-search.component.scss']
})
export class AttributesSearchComponent implements OnInit {
 /**
  * Category id
  */
 @Input() categoryId;
 
 /**
  * Emitts selected attributes when attributes updated
  */
 @Output() attrsUpdated = new EventEmitter();

 /**
  * Category attributes
  */
 public attributes = [];

 /**
  * Checked attributes
  */
 public checkedAttrs = [];

 public areAttributesReady = false;

 @Output() attributesReadyEmitter = new EventEmitter();

 constructor(private productService: ProductService,
             private dal: DbAbstractionLayer,
             protected route: ActivatedRoute) { }

 ngOnInit() {
   this.route.queryParams.subscribe((param) => {
     this.parseParams(param);
     this.getAttributes();
   });
 }

 public attrsEmiter = new EventEmitter();


 /**
  * Get attributes for specific category
  */
 getAttributes(){
   this.productService.getCategory(this.categoryId).subscribe( data => {
     if(data.val()){
       let ids = data.val()[0]['_source']['attrs'];
       if(ids) {
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
           console.log(data.val());
           if(data.val()){
             this.attributes = data.val().map(item => {
               item['_source']['id'] = item['_id'];
               item['_source']['childs'] = item['_source']['childs'].map(child => {
                 child.checked = false;
                 return child;
               });
               return item['_source'];
             });
             this.checkSelected();
             this.attrsEmiter.next(this.attributes.length > 0);
           }
         });
       } else {
         this.checkSelected();
       }
     }
   });
 }

 /**
  * Runs when user check some attribute
  * @param {string} attrId  attribute id
  * @param {string} valueName
  * @param event emitted event
  */
 check(attrId: string, valueName: string, $event){
   let attrName = this.attributes.find(attribute => {
     return attrId === attribute.id;
   }).name;
   if($event.target.checked){
     this.checkedAttrs.push({
       attrId: attrId,
       valueName: valueName
     });
   }else{
     this.checkedAttrs = this.checkedAttrs.filter(checkedAttr => {
       if(checkedAttr.attrId !== attrId || checkedAttr.valueName !== valueName){
         return checkedAttr;
       }
     });
   }
   this.attrsUpdated.emit(this.checkedAttrs);
 }

 checkSelected() {
   for (let i = 0; i < this.attributes.length; i++) {
     for (let j = 0; j < this.checkedAttrs.length; j++) {
       let attribute = this.attributes[i];
       let checkedAttr = this.checkedAttrs[j];
       if(attribute.id === checkedAttr.attrId) {
          for(let k = 0; k < this.attributes[i].childs.length; k++) { 
            let attributeChild = this.attributes[i].childs[k];
            if(attributeChild.key === checkedAttr.valueName) {
              this.attributes[i].childs[k].checked = true;
              break;
            }
       }
      }
     }
   }
   this.areAttributesReady = true;
   this.attributesReadyEmitter.next(true);
 }

  parseParams(param) {
      let checkedAttrs = [];
      Object.keys(param).map( key => {
          param[key].split('~').map( value => {
              checkedAttrs.push({
                  attrId: key,
                  valueName: value
              });
          });
      });
      this.checkedAttrs = checkedAttrs;
      this.attrsUpdated.next(checkedAttrs);
  }
}