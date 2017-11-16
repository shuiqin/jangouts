/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";

import { Broadcaster } from "../shared";
import { FeedsService } from "./shared/feeds.service";
import { VideoStreamDirective } from "./shared/videostream.directive";
import { SendPicsDirective } from "./send-pics.directive";
import { SetVideoSubscriptionDirective } from "./set-video-subscription.directive";

import { IFeed } from "../models/feed";

import {
  AudioButtonComponent,
  VideoButtonComponent,
  IgnoreButtonComponent,
  UnpublishButtonComponent
} from "./buttons";


@Component({
  selector: "jh-feed",
  template: require("./feed.component.html"),
  styles: [require("!raw!sass!./feed.component.scss")],
  entryComponents: [
    AudioButtonComponent,
    VideoButtonComponent,
    IgnoreButtonComponent,
    UnpublishButtonComponent
  ]
})
export class FeedComponent implements OnInit {

  @Input() public feed: IFeed;
  @Input() public sticky: boolean;
  @Input() public stickyByUser: boolean;

  @Output() public toggleSticky: EventEmitter<number> = new EventEmitter<number>();

  private mirrored: boolean = false;

  constructor(private broadcaster: Broadcaster, private feedsService: FeedsService) { }

  public ngOnInit(): void {
    this.mirrored = (this.feed.isPublisher && !this.feed.isLocalScreen);
  }

  @Input()
  set isVoiceDetected(val: boolean) {
    /*
     * Broadcast only if muted (check for false, undefined means still connecting)
     */
    if (this.feed.isPublisher && !this.feed.isLocalScreen && val && !this.feed.audioEnabled) {
      this.broadcaster.broadcast("speaking");
    }
  }

  public thumbnailTag(): string {
    if (this.sticky || this.feed.isIgnored) { return "placeholder"; }
    if (!this.feed.videoEnabled) { return "placeholder"; }
    if (this.feed.isPublisher) { return "video"; }

    if (this.feed.videoSubscription) {
      return "video";
    } else {
      if (this.feed.picture) {
        return "picture";
      } else {
        return "placeholder";
      }
    }
  }

  public click(): void {
    this.toggleSticky.emit(this.feed.id);
  }

  public getStream(): any {
    return this.feedsService.getStream(this.feed.id);
  }
}
