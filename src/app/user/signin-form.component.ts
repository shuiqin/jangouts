/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import * as _ from "lodash";

/* [TODO] - Move to directive */
/*
function adjustHeight() {
  var height = $(window).outerHeight() - $("footer").outerHeight();
  $("#signin").css({
    height: height + 'px'
  });
}
*/

/* [TODO] - Move to directive */
/*
function jhSigninFormLink(scope, element) {
  setTimeout(function() {
    $('#inputUsername', element).focus();
  }, 100);
  scope.vm.adjustHeight();
  $(window).on("resize", function() {
    scope.vm.adjustHeight();
  });
}
*/


import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { ScreenShareHintComponent } from "../screen-share";
import { ThumbnailsModeButtonComponent } from "../videochat";
import { BrowserInfoComponent } from "../browser-info";

import * as fromRoot from "../reducers";
import { IRoom } from "../models/room";
import { IUserPrefs } from "../models/user";

@Component({
  selector: "jh-signin-form",
  template: require("./signin-form.component.html"),
  entryComponents: [
    ScreenShareHintComponent,
    ThumbnailsModeButtonComponent,
    BrowserInfoComponent
  ]
})

export class SigninFormComponent implements OnInit {
  public rooms$: Observable<IRoom[]>;
  public username: string = null;
  public roomId: number;
  public userPrefsSubscription: any;
  public userPrefs: IUserPrefs;

  constructor(
    private store: Store<fromRoot.IState>,
    private route: ActivatedRoute,
    private router: Router) {}

  public ngOnInit(): void {
    this.rooms$ = this.store.select(fromRoot.getRooms);

    this.userPrefsSubscription = this.store.select(fromRoot.getUserPrefs).subscribe(p => {
      this.username = this.username || p.lastUsername;
      this.roomId = this.roomId || p.lastRoom;
    });
  }

  public ngOnDestroy(): void {
    this.userPrefsSubscription.unsubscribe();
  }

  public signin(): void {
    if (this.roomId && this.username) {

      let navigationExtras: NavigationExtras = {
        queryParams: { "user": this.username},
      };

      this.router.navigate(["/rooms", this.roomId], navigationExtras);
    }
  }

}


