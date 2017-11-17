import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import * as user from "../actions/user";
import * as fromRoot from "../reducers";
import { UserService } from "../user/user.service";
import { IUserPrefs } from "../models/user";

@Injectable()
export class UserEffects {

  @Effect()
  loadPrefs$: Observable<Action> = this.actions$
    .ofType(user.LOAD_PREFS)
    .map(_action => this.userService.getSettings())
    .map(s => new user.LoadPrefsSuccessAction(s));

  @Effect({dispatch: false})
  savePrefs$: Observable<Action> = this.actions$
    .ofType<user.SavePrefsAction>(user.SAVE_PREFS)
    .do(action => {
      for (let key in action.payload) {
        this.userService.setSetting(key, action.payload[key]);
      }
    });

  @Effect()
  signIn$: Observable<Action> = this.actions$
    .ofType<user.SignInAction>(user.SIGN_IN)
    .map(action => action.payload)
    .map(({ username, roomId }) => {
      if (typeof(username) === "string" && Number.isInteger(roomId)) {
        return new user.SignInSuccessAction({ username, roomId });
      } else {
        return new user.SignInFailAction();
      }
    });

  // NGRX: FIXME check typescript warnings.
  @Effect({dispatch: false})
  redirect$: Observable<any> = this.actions$
    .ofType<Action>(user.SIGN_IN_SUCCESS)
    .withLatestFrom(this.store$.select(fromRoot.getRouterState))
    .withLatestFrom(this.store$.select(fromRoot.getUserSession))
    .filter(([[action, routerState], userState]) => {
      return routerState.state.url === "/sign_in";
    })
    .map(([_, userState]) => userState)
    .do(({username, roomId}) => {
      this.router.navigate(["/rooms/", roomId], { queryParams: { user: username } } )
    });

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.IState>,
    private router: Router,
    private userService: UserService) {};
}
