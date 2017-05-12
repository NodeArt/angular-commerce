import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { esIndex } from './consts';
import {Injectable, Inject} from "@angular/core";
/**
 * Data abstraction layer is an absraction to some connector (for now realized {@link FirebaseConnector}, but you can create your own using this contract).
 * To use some connector you must provide it in app.module.ts
 * ```
 * providers: [
 *  ...,
 *  {
 *    provide: 'Connector'
 *    useClass: FirebaseConnector
 *  }
 * ]
 * ```
 * There are method with queryObject parameter. {@link ProductService} use them to work with products. Query object are generated in this service.
 */
@Injectable()
export class DbAbstractionLayer {

  constructor(@Inject('Connector') private connector){

  }

  /**
   * Add general category to database
   * 
   * @param {FormGroup} generalCategoryForm form of general category
   */
  addGeneralCategory(generalCategoryForm){
    this.connector.addGeneralCategory(generalCategoryForm);
  }

  /**
   * Add category to database
   * 
   * @param {FormGroup} categoryForm  form of category
   */
  addCategory(categoryForm){
    this.connector.addCategory(categoryForm);
  }

  /**
   * Add new attribute to database
   * 
   * @param {FormGroup} attributeForm  form of attribute
   * @param {string} categoryId id of category
   */
  addAttribute(attributeForm, categoryId){
    this.connector.addAttribute(attributeForm, categoryId);
  }

  /**
   * Add new tag to database
   * 
   * @param {FormGroup} tagForm  form of tag
   * @param {string} categoryId id of category
   */
  addTag(tagForm, categoryId){
    this.connector.addTag(tagForm, categoryId);
  }

  /**
   * Add product to database
   * 
   * @param {Object} product product Object
   */
  addProduct(product){
    this.connector.addProduct(product);
  }

  /**
   * Returns products by query object (look to {@link ProductService} method getProductsByIds)
   */
  getProductsByIds(queryObj){
    return this.connector.requestData(esIndex, 'product', queryObj);
  }

  /**
   * Returns basket content of specific user
   * 
   * @param {string} userId user Id
   * 
   * @returns {Observable} Observable of basket
   */
  getBasketContent(id){
    return this.connector.getBasketContent(id);
  }

  /**
   * Initialize basket history for user. If you want to track basket history run this method when user sign in
   * 
   * @param {string} userId userId or deviceId
   * 
   */
  initializeBasketHistory(userId) {
    return this.connector.initializeBasketHistory(userId);
  }

  /**
   * Returns basket history subject
   * 
   * @returns {Subject} basketHistory Subject of basketHistory
   */
  getBasketHistorySubject(): Subject<any> {
    return this.connector.getBasketHistorySubject();
  }

  /**
   * Returns Rx Observable of basket history of user by userId or deviceId
   * 
   * @param {string} userId  userId or deviceId
   * 
   * @returns {Observable} Rx Observable of basket history
   */
  getBasketHistoryById(id) {
    return this.connector.getBasketHistoryById(id);
  }

  /**
   * Will be realized in next versions
   */
  getСomparison(id){
    return this.connector.getComparison(id);
  }

  /**
   * Set new basket by user id or device id
   * @param id  userId or deviceId
   * @param newBasket 
   */
  setNewBasket(id, newBasket){
   return this.connector.setNewBasket(id, newBasket);
  }

  /**
   * Will be realized in next versions
   */
  addProductToComparison(id, product){
    return this.connector.addProductToComparison(id, product);
  }

  /**
   * Will be realized in next versions
   */
  removeProductFromComparison(id, idInComparison){
    return this.connector.removeProductFromComparison(id, idInComparison);
  }

  /**
   * Gets data hits from ElasticSearch
   * 
   * @param {string} index ElasticSearch index
   * @param {string} type ElasticSearch type
   * @param {Object} queryObj query object for ElasticSearch
   * 
   * @returns  {Observable} Observable of requested data hits
   */
  requestData(esIndex, type, queryObj){
    return this.connector.requestData(esIndex, type, queryObj);
  }

  /**
   * Gets full data from  ElasticSearch
   * 
   * @param {string} index ElasticSearch index
   * @param {string} type ElasticSearch type
   * @param {Object} queryObj query object for ElasticSearch
   * 
   * @returns  {Observable} Observable of requested data
   */
  requestFullData(esIndex, type, queryObj){
    return this.connector.requestFullData(esIndex, type, queryObj);
  }

  /**
   * Gets total item of data from ElasticSearch
   * 
   * @param {string} index ElasticSearch index
   * @param {string} type ElasticSearch type
   * @param {Object} queryObj query object for ElasticSearch
   * 
   * @returns {Observable} Observable of total item
   */
  requestItemsTotal(esIndex, type, queryObj){
    return this.connector.requestItemsTotal(esIndex, 'product', queryObj);
  }
  
  /**
   * Return tags by query object
   * 
   * @param {Object} queryObj  ElasticSearch query object
   * 
   * @returns {Observable} Observable of tags
   */
  getTags(queryObj){
    return this.connector.requestData(esIndex, 'tags', queryObj);
  }

  /**
   * Return attributes by query object
   * 
   * @param {Object} queryObj  ElasticSearch query object
   * 
   * @returns {Observable} Observable of attributes
   */
  getAttributes(queryObj){
    return this.connector.requestData(esIndex, 'attributes', queryObj);
  }

  /**
   * Logout user
   */
  logout(){
    this.connector.logout();
  }

  /**
   * Register user with email and password
   * 
   * @param {string} email  User email
   * @param {string} password  User password
   * 
   * @returns Promise containing user data
   */
  register(email, password){
    return this.connector.register(email, password);
  }

  /**
   * Register user with email and password. Save additional information in database
   * 
   * @param registerForm  Object that have email, password and any additional information about user. 
   * Additional information stores in database as user backet
   */
  registerUser(registerForm){
    return this.connector.registerUser(registerForm);
  }

  /**
   * Get user data
   * 
   * @param {string} uid  user Id
   * 
   * @returns {Observable} Observable of user data
   */ 
  getUserData(uid){
    return this.connector.getUserData(uid);
  }

  /**
   * Login with email and password
   * 
   * @param {string} email  User email
   * @param {string} password  User password
   * 
   * @returns Promise containing User
   */ 
  loginEmail(email, password){
    return this.connector.loginEmail(email, password);
  }

  /**
   * Check old session flow using device id
   * 
   * @param {string} deviceId  User device Id
   */
  checkOldSessionFlow(deviceId){
    this.connector.checkOldSessionFlow(deviceId);
  }

  /**
   * Connect [Session-flow]{@link https://www.npmjs.com/package/@nodeart/session-flow} to databese. 
   * 
   * @param {SessionFlow} sessionFlow  SessionFlow service
   * @param {string} deviceId  User device id generated by SessionFlow 
   * @param {string} sessionId  User session id generated by SessionFlow
   * 
   */
  connectSessionFlowToDB(sessionFlow, deviceId, sessionId){
    this.connector.connectSessionFlowToDB(sessionFlow, deviceId, sessionId);
  }

  /**
   * Returns visited routes
   * 
   * @returns array of visited routes objects
   */
  getVisitedRoutes(){
    return this.connector.getVisitedRoutes();
  }
  
  /**
   * Returns user clicks 
   * 
   * @returns array of user clicks objects
   */
  getUserClicks(){
    return this.connector.getUserClicks();
  }

  /**
   * Returns auth object. Avoid manipulating with connector directly. Use dal methods to communicate with connector
   * 
   * @returns  Auth object
   */
  getAuth(){
    return this.connector.getAuth();
  }

  /**
   * Save new order to database
   * 
   * @param {Object} paymentData
   * 
   * @returns {Observable} Observable
   */
  saveOrder(orderData) {
    return this.connector.saveOrder(orderData);
  }
  
  /**
   * Add payment requets. Server listens database backet with payments request and process coming requests
   * 
   * @param {Object} data PaymentData
   * @param {string} paymentMethod  name of payment method
   * 
   * @returns {Observable} Observable
   */
  addPaymentRequest(data, paymentMethod){
    return this.connector.addPaymentRequest(data, paymentMethod);
  }

  /**
   * Returns payment response by id
   * 
   * @param {string} paymentKey id of payment response. Payment request and payment response have same ids in their backets
   * 
   * @returns {Observable} Observable of payment response
   */  
  listenPaymentResponse(paymentKey){
    return this.connector.listenPaymentResponse(paymentKey);
  }

  /**
   * Returns orders by user id
   * 
   * @param {string} userId user id
   * 
   * @returns {Observable} Observable of user orders
   */
  getOrdersByUserId(userId) {
    let queryObj = {
      query: {
        multi_match: {
          query: userId,
          fields: ["orderForm.userId"],
          type: "phrase"
        }
      }
    };
    console.log(queryObj);
    return this.connector.requestFullData(esIndex, 'orders', queryObj);
  }

  /**
   * Send letter with password resetting to specific email 
   * 
   * @param {string} email User email
   * 
   * @returns      Promise containing void
   */
  resetPassword(email) {
    return this.connector.resetPassword(email);
  }

  /**
   * Get order by Id
   * @param id id of order
   * @returns {Observable} Observable of order
   */
  getOrderById(id) {
    return this.connector.getOrderById(id);
  }
  
  /**
   * Emits order object when new order added
   * 
   * @returns {Observable} Observable of new order
   */
  listenOrders() :Observable<any> {
    return this.connector.listenOrders();
  }

  getOrderSubject() {
    return this.connector.getOrderSubject();
  }

  getSeoText(url: string, indexBlock: number) :Observable<any>{
    return this.connector.getSeoText(url, indexBlock);
  } 
}
