import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductState,
  (state:fromFeature.ProductsState) => state.toppings
);

export const getToppingEnities = createSelector(
  getToppingsState,
  fromToppings.getToppingEnities
);

export const getAllToppings = createSelector(
  getToppingEnities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id,10)])
  }
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);
