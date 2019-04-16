import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

export interface ToppingState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: true,
  selectedToppings: [],
}

export function reduer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingState {
  switch(action.type) {
    case fromToppings.VISUALIZE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      }
    }
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = toppings.reduce(
        (entities : { [id: number]: Topping}, topping: Topping ) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );
      return {
        ...state,
        loaded: true,
        loading: false,
        entities,
      }
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      }
    }
  }
  return state;
}
//doubt => purpose of this section
export const getToppingEnities = ( state: ToppingState ) => state.entities;
export const getToppingsLoaded = ( state: ToppingState ) => state.loaded;
export const getToppingsLoading = ( state: ToppingState ) => state.loading;
export const getSelectedToppings = (state: ToppingState ) => state.selectedToppings;
