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
 private checkedAttrs = [];

 constructor(private productService: ProductService,
             private dal: DbAbstractionLayer) { }

 ngOnInit() {
   this.getAttributes();
 }

 public attrsEmiter = new EventEmitter();


 /**
  * Get attributes for specific category
  */
 getAttributes(){
   this.productService.getCategory(this.categoryId).subscribe( data => {
     if(data.val()){
       console.log("Attrs ids:");
       console.log(data.val());
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
           if(data.val()){
             console.log("Final data: ");
             this.attributes = data.val().map(item => {
               item['_source']['id'] = item['_id'];
               return item['_source'];
             });
             console.log(this.attributes);
             this.attrsEmiter.next(this.attributes.length > 0);
           }
         });
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
}