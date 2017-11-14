import * as products from 'a2c-products-actions';

export interface State {
  selectedProductId: string | null;
  products: Array<any>;
  filteredProducts: Array<any>;
}

const initialState: State = {
  selectedProductId: null,
  products: [],
  filteredProducts: [],
};

export const events: { [key: string]: Function } = {
  [products.LOAD_SUCCESS]: (state: State, action: products.ProductsLoaded): State => {
    const payload = Object.keys(action.payload).map(key => ({id: key, ...action.payload[key]}));
    return {
      products: [...payload],
      filteredProducts: [...payload],
      selectedProductId: state.selectedProductId,
    };
  }
};

export function reducer(state = initialState, action: products.Actions): State {
  if (!events[action.type]) {
    return state;
  }
  return events[action.type](...Array.from(arguments));
}
