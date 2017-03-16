/**
 * User visited route
 */
export class VisitedRoute {
  /**
   * Route name
   */
  route: string;

  /**
   * Time when user entered to the route
   */
  timeStart: Date;

  /**
   * Time when user leaved the route
   */
  timeEnd: Date;

  /**
   * Time duration
   */
  duration: number;

  constructor() {
  }

  /**
   * Return time start string
   */
  getStartTimeString(){
    return this.timeStart.toISOString();
  }

  /**
   * Return time end string
   */
  getEndTimeString(){
    return this.timeEnd.toISOString();
  }

  /**
   * Calculate time duration on route
   */
  calcDuration(){
    this.duration = Math.abs(this.timeEnd.getTime() - this.timeStart.getTime());
  }

  /**
   * Return object of visited route 
   */
  getStringObject(){
    let visitedRouteObject = {};
    visitedRouteObject['route'] = this.route;
    visitedRouteObject['timeStart'] = this.timeStart.toISOString();
    visitedRouteObject['timeEnd'] = this.timeEnd.toISOString();
    visitedRouteObject['duration'] = this.duration;
    return visitedRouteObject;
  }

}
