/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Broadcaster } from "../shared";
import { BlockUIComponent} from "../block-ui";
import { VideoChatComponent } from "../videochat";
import { UserService } from "../user/user.service";

import { RoomService } from "./room.service";
import * as fromRoot from "../reducers";

@Component({
  selector: "jh-room",
  template: require("./room.component.html"),
  entryComponents: [
    VideoChatComponent,
    BlockUIComponent
  ]
})
export class RoomComponent implements OnInit {
  private user: string;

  constructor(
    private roomService: RoomService,
    private store: Store<fromRoot.IState>,
    private broadcaster: Broadcaster) {};

  public ngOnInit(): void {
    let username: string;
    this.store.select(fromRoot.getUsername).take(1).subscribe(v => username = v);
    this.roomService.enter(username);

    this.setEvents();
    this.setKeybindings();
  }

  private setEvents(): void {
    this.broadcaster.on("room.error").subscribe((error: any): void => {
      // [FIXME] - do something neat
      alert("Janus server reported the following error:\n" + error);
    });

    // this.broadcaster.on("consentDialog.changed").subscribe((open: any): void => {
      // this.broadcaster.broadcast("blockUI", open);
    // });
  }

  private setKeybindings(): void {
    window.Mousetrap.bind("alt+m", (event: KeyboardEvent): boolean => {
      this.roomService.toggleChannel("audio");
      return false; // prevent bubbling
    });
    window.Mousetrap.bind("alt+n", (event: KeyboardEvent): boolean => {
      this.roomService.toggleChannel("video");
      return false; // prevent bubbling
    });

      /*
       * Signout was never implemented
      window.Mousetrap.bind("alt+q", (event: KeyboardEvent) => {
        this.userService.signout();
        return false; // prevent bubbling
      });
      */
  }
}
