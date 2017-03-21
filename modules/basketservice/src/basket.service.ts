import { DbAbstractionLayer } from '@nodeart/dal/index';
import {Injectable} from "@angular/core";
import {SessionFlow} from "@nodeart/session-flow/index";
import { Subject } from "rxjs/Subject";

/**
 * Service that have logic to work with basket
 */
@Injectable()
export class BasketService{

  /**
   * Products subject
   */
  products: Subject<any[]> = new Subject<any[]>();
  
  /**
   * Current products in basket
   */
  productsSnapshot = [];

  /**
   * Total price of products
   */
  totalPrice: number = 0;

  /**
   * Total items in basket
   */
  totalItems: number = 0;
  /**
   * User id
   */
  userId: string;

  /**
   * User basket history Rx Subject
   */
  basketHistory: Subject<any>;
  constructor(private sessionFlow: SessionFlow, private dal: DbAbstractionLayer){
    this.basketHistory = this.dal.getBasketHistorySubject();
    this.products.subscribe(products => {
      this.productsSnapshot = products;
      this.totalPrice = 0;
      this.totalPrice = products.reduce((prevValue, currProduct) =>{
        return prevValue + currProduct.items * currProduct.product.price;
      }, 0);
      this.totalItems = products.reduce((prevValue, currProduct) => {
        return prevValue + currProduct.items;
      }, 0);
    });
    if(sessionFlow.userId === 'guest'){
      this.getProducts(sessionFlow.deviceId);
    }
    this.dal.getAuth().onAuthStateChanged((data) => {
      if(data == null){
        this.userId = null;
      }
      if(data){
        this.userId = data.uid;
        this.getProducts(this.userId);
      }
    });
  }

  /**
   * Calls {@link getProducts} with user id if exists, otherwise device id 
   */
  updateProducts(){
    if(this.userId){
      this.getProducts(this.userId);
    }else{
        this.getProducts(this.sessionFlow.deviceId);
    }
  }

  /**
   * Get products from database and update on client
   * @param id user id or device id
   */
  getProducts(id){
    this.dal.getBasketContent(id).subscribe( data => {
      if(!data.exists()){
        this.products.next([]);
      }
      if(data.val()){
        let products = Object.keys(data.val()).map((key) => {
          let item = data.val()[key];
          item['idInBasket'] = key;
          return item;
        });
        let ids = products.map(item => {
          return item['id'];
        });
        let queryObj = {
          query: {
            ids: {
              values: ids
            }
          }
        };
        this.dal.getProductsByIds(queryObj).subscribe( data => {
          if(data.val()){
            let result = [];
            for(let i = 0; i < products.length; i++) {
              for(let j = 0; j < data.val().length; j++){
                let product = data.val()[j];
                if(products[i]['id'] === product['_id']){
                  products[i]['product'] = product['_source'];
                  result.push(products[i]);
                }
              }
            }
            this.products.next(result);
          }
        });
      }
    });
  }

  /**
   * Add product to database
   * @param {Object} product object of product
   */
  addProduct(product){
    let productExistInBasket = false;
    let newBasket = this.productsSnapshot.map(basketProduct => {
      if(basketProduct.fullId === product.fullId) {
        basketProduct.items++;
        productExistInBasket = true;
      }
      return basketProduct;
    });
    if(!productExistInBasket) {
      product.items = 1;
      newBasket.push(product);
    }
    if(this.userId){
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {
        this.getProducts(this.userId);
      });
    }else{
      this.dal.setNewBasket(this.sessionFlow.deviceId, newBasket).subscribe(data => {
        this.getProducts(this.sessionFlow.deviceId);
      });
    }
    this.basketHistory.next({
      action: "added",
      product: product
    });
  }

  /**
   * Remove product from basket
   * @param product product to remove
   */
  removeProduct(product){
    let newBasket = this.productsSnapshot.reduce((prevArray, basketProduct) => {
      if(basketProduct.fullId == product.fullId){
        if (basketProduct.items > 1){
          basketProduct.items--;
          prevArray.push(basketProduct);
          return prevArray;
        } else {
          return prevArray;
        }
      } else {
        prevArray.push(basketProduct);
        return prevArray;
      }
    }, []);
    if(this.userId){
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {});
      this.getProducts(this.userId);
    }else{
      this.dal.setNewBasket(this.sessionFlow.deviceId, newBasket).subscribe(data => {});
      this.getProducts(this.sessionFlow.deviceId);
    }
    this.basketHistory.next({
      action: "deleted",
      product: product
    });
  };

  /**
   * Remove all items of specific product in basket
   * @param product specific product
   */
  removeAllProductItems(product){
    let newBasket = this.productsSnapshot.reduce((prevArray, basketProduct) => {
      if(basketProduct.fullId == product.fullId){
          return prevArray;
      }
      prevArray.push(basketProduct);
      return prevArray;
    }, []);
    if(this.userId){
      this.dal.setNewBasket(this.userId, newBasket).subscribe(data => {});
      this.getProducts(this.userId);
    }else{
      this.dal.setNewBasket(this.sessionFlow.deviceId, newBasket).subscribe(data => {});
      this.getProducts(this.sessionFlow.deviceId);
    }
    this.basketHistory.next({
      action: "deleted",
      product: product
    });
  }

}
