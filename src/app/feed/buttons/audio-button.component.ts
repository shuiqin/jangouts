/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, OnInit, Input, Inject, forwardRef } from "@angular/core";

import { ActionService } from "../../room/action.service";
import { IFeed } from "../../models/feed";
import { Broadcaster } from "../../shared";

@Component({
  selector: "jh-audio-button",
  template: require("./audio-button.component.html")
})
export class AudioButtonComponent implements OnInit {

  @Input() public feed: IFeed;

  /* Needed in order to fix import barrels error https://github.com/angular/angular.io/issues/1301 */
  constructor(@Inject(forwardRef(() => ActionService)) private actionService: ActionService, // tslint:disable-line
              private broadcaster: Broadcaster) { }

  public ngOnInit(): void { }

  public toggle(): void {
    this.actionService.toggleChannelById("audio", this.feed.id);
    if (this.feed.isPublisher && !this.feed.isLocalScreen && !this.feed.audioEnabled) {
      this.broadcaster.broadcast("dismissLastNotification");
    }
  }

  public showsEnable(): boolean {
    return (this.feed.isPublisher && !this.feed.isLocalScreen && !this.feed.audioEnabled);
  }

  public showsDisable(): boolean {
    return (!this.feed.isIgnored && this.feed.audioEnabled);
  }

  public showsAudioOff(): boolean {
    return !(this.feed.isPublisher || this.feed.isIgnored || this.feed.audioEnabled);
  }

}
