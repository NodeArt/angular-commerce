import {Action} from '@ngrx/store';

export const GET_ALL = '[A2C Products] Get All Products';
export const LOAD_SUCCESS = '[A2C Products] Load Success';

export class GetAllProducts implements Action {
  public readonly type = GET_ALL;

  constructor() {}
}

export class ProductsLoaded implements Action {
  public readonly type = LOAD_SUCCESS;

  constructor(public payload: any) {}
}

export type Actions =
  | GetAllProducts
  | ProductsLoaded;
