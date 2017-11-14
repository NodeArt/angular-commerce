import * as fromProducts from './products';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProductsState {
  products: fromProducts.State;
}

export const reducers = {
  products: fromProducts.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.products);

export const getLoadedProducts = createSelector(
  getProducts,
  (state: fromProducts.State) => state.products
);

export const getFilteredProducts = createSelector(
  getProducts,
  (state: fromProducts.State) => state.filteredProducts
);

export const getSelectedProduct = createSelector(
  getProducts,
  (state: fromProducts.State) => state.selectedProductId
);
