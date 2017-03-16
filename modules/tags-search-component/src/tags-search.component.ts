import { DbAbstractionLayer } from '@nodeart/dal';
import { ProductService } from '@nodeart/productservice';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Tags search component for filtering product by tags
 */
@Component({
  selector: 'app-tags-search',
  templateUrl: './tags-search.component.html',
  styleUrls: ['./tags-search.component.scss']
})
export class TagsSearchComponent implements OnInit {

  /**
   * Category id for tags
   */
  @Input() categoryId;

  /**
   * Emit new selected tags when updated 
   */
  @Output() tagsUpdated = new EventEmitter();

  /**
   * Tags from specific category
   */
  public tags = [];

  /**
   * Checked tags array
   */
  private checkedTags = [];

  constructor(private productService: ProductService,
              private dal: DbAbstractionLayer) { }


  ngOnInit() {
    this.getTags();
  }

  /**
   * Get tags by inputed id
   */
  getTags(){
    this.productService.getCategory(this.categoryId).subscribe( data => {
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
      }
    });
  }

  /**
   * On user select a tag add to checked tags
   * @param itemId id of tag
   * @param event event of checkbox
   */
  check(itemId: string, $event){
    if($event.target.checked){
      this.checkedTags.push({
        id: itemId
      });
    }else{
      this.checkedTags = this.checkedTags.filter(checkedTag => {
        if(checkedTag.id !== itemId){
          return checkedTag;
        }
      });
    }
    this.tagsUpdated.emit(this.checkedTags);
  }
}