import { NgModule } from '@angular/core';
import { ProductService} from './product-service';
import { DalModule } from '@nodeart/dal/index';
/**
 * Product service module. Product service implements logic of manipulating 
 */
@NgModule({
    imports: [
        DalModule
    ],
    providers: [
        ProductService
    ]
})
export class ProductServiceModule { }