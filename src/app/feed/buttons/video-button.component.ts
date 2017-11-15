/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, OnInit, Input, Inject, forwardRef } from "@angular/core";

import { ActionService } from "../../room/action.service";
import { IFeed } from "../../models/feed";

@Component({
  selector: "jh-video-button",
  template: require("./video-button.component.html")
})
export class VideoButtonComponent implements OnInit {

  @Input() public feed: IFeed;

  /* Needed in order to fix import barrels error https://github.com/angular/angular.io/issues/1301 */
  constructor(@Inject(forwardRef(() => ActionService)) private actionService: ActionService) { } // tslint:disable-line

  public ngOnInit(): void { }

  public toggle(): void {
    this.actionService.toggleChannelById("video", this.feed.id);
  }

  public showsEnable(): boolean {
    return (this.feed.isPublisher && !this.feed.videoEnabled);
  }

  public showsDisable(): boolean {
    return (this.feed.isPublisher && this.feed.videoEnabled);
  }

}
