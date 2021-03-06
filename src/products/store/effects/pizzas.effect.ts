import { Injectable } from "@angular/core";

import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';


@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,// doubt => necessary of making this as obervable
    private pizzaService: fromServices.PizzasService
  ) {}

  //doubt
  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS) // filter actions with action type LOAD_PIZZAS
    .pipe( switchMap(() => {
      return this.pizzaService.getPizzas()
      .pipe(
        map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzaService
          .createPizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError( error => of(new pizzaActions.CreatePizzaFail(error)))
          );
      })
    );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map(pizza => {
        return new fromRoot.Go({
          path: ['/products', pizza.id],
        });
      })
    );

  @Effect()
  upatePizza$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map((action: pizzaActions.UpdatePizza) => action.payload),
      switchMap(pizza => { // doubt => why switchmap
        return this.pizzaService
          .updatePizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            catchError( error => of(new pizzaActions.UpdatePizzaFail(error)))
          );
      })
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzaService
          .removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError( error => of(new pizzaActions.RemovePizzaFail(error)))
          );
      })
    );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe( //doubt => can only be map function?
      map( pizza => {
        return new fromRoot.Go({ path:['products'] });
      })
    )
}
