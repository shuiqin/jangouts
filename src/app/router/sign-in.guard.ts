import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import "rxjs/add/operator/catch";

import * as fromRoot from "../reducers";
import { IUserSession } from "../models/user";
import { SignInAction } from "../actions/user";

// NGRX: TODO: update router with user and roomId parameters.

@Injectable()
export class SignInGuard implements CanActivate {
  constructor(
    private router: Router,
    private location: Location,
    private store: Store<fromRoot.IState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.signIn(route)
      .switchMap(({status, username, roomId}) => {
        if (status !== "ok") {
          this.router.navigate(["/sign_in"]);
          return of(false);
        }

        this.location.replaceState(`/rooms/${roomId}`, `user=${username}`);
        return of(true);
      })
      .catch(() => of(false));
  }

  signIn(route: ActivatedRouteSnapshot): Observable<any> {
    return this.store
      .select(fromRoot.getUserSession)
      .do(data => {
        const userSession = <IUserSession>(data || {});
        let { username, roomId } = userSession;

        if (!username || !roomId) {
          username = username || route.queryParamMap.get("user");
          roomId = roomId || parseInt(route.paramMap.get("roomid"), 10);
          this.store.dispatch(new SignInAction({ username, roomId }));
        }
      })
      .filter(({status}) => status !== null)
      .take(1);
  }
}
