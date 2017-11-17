import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import "rxjs/add/operator/catch";

import * as fromRoot from "../reducers";
import { LoadRoomsAction } from "../actions/rooms";

@Injectable()
export class RoomsGuard implements CanActivate {
  constructor(private store: Store<fromRoot.IState>) {}

  canActivate(): Observable<boolean> {
    return this.getRooms()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }

  getRooms(): Observable<any> {
    return this.store
      .select(fromRoot.getRooms)
      .do(data => {
        if (!data) {
          this.store.dispatch(new LoadRoomsAction());
        }
      })
      .filter(data => data !== null)
      .take(1);
  }
}
