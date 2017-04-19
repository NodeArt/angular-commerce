import {Injectable} from "@angular/core";
import {DbAbstractionLayer} from "@nodeart/dal/index";

/**
 * Product service. Has different methods for manipulating with products and its properties. 
 */
@Injectable()
export class ProductService{
  
  /**
   * ElasticSearch index name. For default "firebase"
   */
  public esIndex = 'firebase';

   constructor(private dal: DbAbstractionLayer){
  }

  /**
   * Get product by id
   * @param {string} id id of product
   */
  getOneProduct(id: string){
    let queryObject = {
      "query": {
          "term":{
              "_id": id
          }
      }
    };
    return this.dal.requestData(this.esIndex, 'product', queryObject);
  }

  /**
   * Return Observable array of products
   * @param {string} categoryId products category id
   * @param {Array} currentPrice ranges of price(minimum price, maximum price)
   * @param {Array} attributes attributes ids array
   * @param {Array} tags tags ids array
   * @param {integer} size number of returned products
   * @param {integer} from offset of products
   * 
   * @returns {Observable} Observable  of products
   */
  searchProducts(categoryId: string, currentPrice, attributes: any[], tags: any[], size: number, from: number){
    let queryObject = {
     size: size,
     from: from,
     query: {
        bool: {
          must: [
            {
              bool: {
                should: []
              }
            },
            {
              match: {
                "category" : categoryId
              }
            },
            {
              "range" : {
                "price" : {
                    "gte" : currentPrice[0],
                    "lte" : currentPrice[1]
                }
              }
            }
          ]
        }
      }
    };
    for(let i = 0; i < attributes.length; i++){
        let key = "attributes." + attributes[i]['attrId'];
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: attributes[i]['valueName'],
            fields: [key]
          }
        });
    }
    for(let i = 0; i < tags.length; i++){
        let key = "tags";
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: tags[i]['id'],
            fields: [key]
          }
        });
    }
    console.log(queryObject);
    return this.dal.requestData(this.esIndex, 'product', queryObject);
  }

  /**
   * Return price ranges of products in specific category. Properties:
   * ```
   * 1. max_price
   * 2. min_price
   * ```
   * @param {string} categoryId category id
   * @returns {Observable} Observable of object {max_price, min_price}
   */
  getPriceRanges(categoryId){
    let queryObject = {
     aggs : {
        max_price : { max : { field : "price" } },
        min_price : { min : { field : "price" } }
      },
      query: {
        bool: {
          should: {
            match: {
              category: categoryId
                  }
              }
          }
      }
    };
    console.log(JSON.stringify(queryObject));
    return this.dal.requestFullData(this.esIndex, 'product', queryObject);
  }

  /**
   * Return filtered products with price ranges
   * @param {Array} priceRange first element - min price, second - max price 
   * @param {Array} attributes 
   * @param {Array} tags array of tags ids
   * @param {integer} size number of returned products
   * @param {integer} from offset of products
   * 
   * @returns {Observable} Observable of products
   */
  filterProducts(priceRange: number[], attributes : any[], tags: any[], size, offset){
    let queryObject = {
     size: size,
     from: offset,
     query: {
        bool: {
          must: [
            {
              bool: {
                should: []
              }
            },
            {
              "range" : {
                "price" : {
                    "gte" : priceRange[0],
                    "lte" : priceRange[1]
                }
              }
            }
          ]
        }
      }
    };
    for(let i = 0; i < attributes.length; i++){
        let key = "attributes." + attributes[i]['attrId'];
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: attributes[i]['valueName'],
            fields: [key]
          }
        });
    }
    for(let i = 0; i < tags.length; i++){
        let key = "tags";
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: tags[i]['id'],
            fields: [key]
          }
        });
    }
    return this.dal.requestFullData(this.esIndex, 'product', queryObject);
  }

  /**
   * Return general category data by id
   * @param {string} generalCategoryId  general category id
   * 
   * @returns {Observable} Observable of general category data
   */
  getGeneralCategory(generalCategoryId){
    let queryObj = {
        "query": {
            "term":{
                "_id": generalCategoryId.toString()
            }
        }
    };
    return this.dal.requestData(this.esIndex, 'general-category', queryObj);
  }

  /**
   * Retunr gategory data by id
   * @param categoryId category id
   * 
   * @returns {Observable} Observable of category data
   */
  getCategory(categoryId){
    let queryObj = {
        "query": {
            "term":{
                "_id": categoryId.toString()
            }
        }
    };
   return this.dal.requestData(this.esIndex, 'category', queryObj);
  }

  /**
   * Return all general categories
   * 
   * @returns {Observable} Observable array of general categories
   */
  getGeneralCategories(){
    let queryObj = {
        "query": {
            "match_all": {}
        }
    };
    return this.dal.requestData(this.esIndex, 'general-category', queryObj);
  }

  /**
   * Return categories by general category id
   * @param {string} categoryId category id 
   * 
   * @returns {Observable} Observable array of categories
   */
  getCategories(categoryId){
    let queryObj;
    if(categoryId == ''){
      queryObj = {
        query: {
          filtered: {
            filter: {
              bool: {
                must_not: [
                  {
                    exists: {
                      field: "parentId"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    } else {
      queryObj = {
        query: {
          term: {
            parentId: categoryId
          }
        }
      };
    }
    console.log(JSON.stringify(queryObj));
    return this.dal.requestData(this.esIndex, 'category', queryObj);
  }

  /**
   * Get products from multiple categories
   * @param {Array} categoryIds array of category ids 
   * @param {integer} size number of returned products
   * @param {integer} from offset of products
   * 
   * @returns {Observable} Observable of array of products 
   */
  getProductsByCategoryIds(categoryIds, size, from){
    let queryObj = {
      size: size,
      from: from,
      query: {
        constant_score: {
          filter: {
            terms: {
              category: categoryIds
            }
          }
        }
      }
    }
    return this.dal.requestData(this.esIndex, 'product', queryObj);
  }

  /**
   * Return products by part of name. You pass part of name and method return Observable 
   * of all product that match your query
   * @param {string} query part of product name
   * @param {integer} size number of returned products
   * 
   * @returns {Observable} Observable of data
   */
  getProducts(query, size){
    query = query.split(' ');
    let queryObj = {
      "size": size,
        "query": {
          "bool": {
            "must": [
            ]
          }
        }
    };
    query.map(term => {
      term = term.replace(/\(|\)/g, '');
      queryObj.query.bool.must.push({
        "wildcard": {
          "name": term.toLowerCase() + "*"
        }
      });
    });
    return this.dal.requestFullData(this.esIndex, 'product', queryObj);
  }

  /**
   * Return number of total pages required to put all products from specific category
   * @param {string} categoryId  category id
   * @param {Array} currentPrice ranges of price(minimum price, maximum price)
   * @param {Array} attributes attributes ids array
   * @param {Array} tags tags ids array
   * 
   * @returns {Observable} Observable of total items
   */
  getTotalPages(categoryId, currentPrice, attributes: any[], tags: any[]){
    let queryObject = {
     size: 0,
     query: {
        bool: {
          must: [
            {
              bool: {
                should: []
              }
            },
            {
              match: {
                "category" : categoryId
              }
            },
            {
              "range" : {
                "price" : {
                    "gte" : currentPrice[0],
                    "lte" : currentPrice[1]
                }
              }
            }
          ]
        }
      }
    };
    for(let i = 0; i < attributes.length; i++){
        let key = "attributes." + attributes[i]['attrId'];
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: attributes[i]['valueName'],
            fields: [key]
          }
        });
    }
    for(let i = 0; i < tags.length; i++){
        let key = "tags";
        queryObject.query.bool.must[0]['bool'].should.push({
          multi_match: {
            query: tags[i]['id'],
            fields: [key]
          }
        });
    }
    console.log(JSON.stringify(queryObject));
    return this.dal.requestItemsTotal(this.esIndex, 'product', queryObject);
  }

  /**
   * Return number of total pages required to put all products from multiple categories
   * @param {Array} categoryIds  array of category ids
   * 
   * @returns {Observable} Observable of total items
   */
  getTotalPagesByCategoryIds(categoryIds){
    let queryObj = {
      size: 0,
      query: {
        constant_score: {
          filter: {
            terms: {
              category: categoryIds
            }
          }
        }
      }
    };
    return this.dal.requestItemsTotal(this.esIndex, 'product', queryObj);
  }

  /**
   * Return one attribute by id
   * @param {string} attributeId  attribute id
   * 
   * @returns {Observable} Observable of attribute data
   */
  getOneAttribute(attributeId){
    let queryObj = {
        "query": {
            "term": {
                "_id": attributeId
            }
        }
    }
    return this.dal.requestData(this.esIndex, 'attributes', queryObj);
  }

  /**
   * Return one tag by id
   * @param {string} tagId  tag id
   * 
   * @returns {Observable} Observable of tag data
   */
  getOneTag(tagId){
    let queryObj = {
      "query": {
        "term": {
            "_id": tagId
        }
      }
    };
    return this.dal.requestData(this.esIndex, 'tags', queryObj);
  }
}
