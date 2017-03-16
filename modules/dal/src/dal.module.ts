import {NgModule} from "@angular/core";
import {DbAbstractionLayer} from "./db-abstraction-layer";

/**
 * Data abstract layer module
 */
@NgModule({
  providers: [
    DbAbstractionLayer
  ]
})
export class DalModule{

}
