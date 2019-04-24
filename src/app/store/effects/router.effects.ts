import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';

import * as RouterActions from '../actions/router.action';
import { map, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  //doubt
  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(RouterActions.GO)
    .pipe(
      map((action: RouterActions.Go)=>action.payload),
      tap(({path, query: queryParams, extras}) => {
        this.router.navigate(path, {queryParams, ...extras});
      })
    );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(RouterActions.BACK)
    .pipe( tap( () => this.location.back() ) )

  @Effect({dispatch: false})
  navigateForward$ = this.actions$
    .ofType(RouterActions.FORWARD)
    .pipe( tap( () => this.location.forward() ) )
}
