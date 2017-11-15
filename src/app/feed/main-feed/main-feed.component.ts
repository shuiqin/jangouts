/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, Input } from "@angular/core";

import { VideoStreamDirective } from "../shared";
import { FeedsService } from "../shared/feeds.service";
import { IFeed } from "../../models/feed";

@Component({
  selector: "jh-main-feed",
  template: require("./main-feed.component.html"),
  styles: [require("!raw!sass!./main-feed.component.scss")]
})
export class MainFeedComponent {

  @Input() public feed: IFeed;
  @Input() public message: string;

  constructor(private feedsService: FeedsService) { }

  public getStream(): any {
    return this.feedsService.getStream(this.feed.id);
  }
}
