import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

import * as user from "../actions/user";
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

  constructor(private actions$: Actions, private userService: UserService) {};
}
