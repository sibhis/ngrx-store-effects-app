import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params,
  params: Params
}

export interface State {
  routerReducer: fromRouter.RouterReducerState
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot):RouterStateUrl {
    const { url } = routerState; //const url = routerState.url;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;
    return { url, queryParams, params };
   }
}
