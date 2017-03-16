/**
 * User click in app
 */
export class UserClick{
  /**
   * Time when click emitted
   */
  time: Date;
  /**
   * Selector where user clicked
   */
  selectorName: string;
  /**
   * Current route where user clicked
   */
  route: string;

  /**
   * Return object with string params
   */
  getStringObject(){
    let object = {};
    object['route'] = this.route;
    object['selectorName'] = this.selectorName;
    object['time'] = this.time.toISOString();
    return object;
  }
}
