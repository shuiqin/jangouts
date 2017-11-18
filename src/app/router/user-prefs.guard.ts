/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import "rxjs/add/operator/catch";

import * as fromRoot from "../reducers";
import { LoadPrefsAction } from "../actions/user";

@Injectable()
export class UserPrefsGuard implements CanActivate {
  constructor(private store: Store<fromRoot.IState>) {}

  canActivate(): Observable<boolean> {
    return this.getUserPrefs()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }

  getUserPrefs(): Observable<any> {
    return this.store
      .select(fromRoot.getUserPrefs)
      .do(data => {
        if (!data) {
          this.store.dispatch(new LoadPrefsAction());
        }
      })
      .filter(data => data !== null)
      .take(1);
  }
}

