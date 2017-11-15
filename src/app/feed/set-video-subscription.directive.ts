/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Directive, ElementRef, Input, OnInit } from "@angular/core";

import { FeedsService } from "./shared/feeds.service";
import { IFeed } from "../models/feed";

@Directive({ selector: "[jhSetVideoSubscription]" })
export class SetVideoSubscriptionDirective implements OnInit {

  @Input() public feed: IFeed;
  @Input() public initial: boolean;

  private el: any;

  constructor (el: ElementRef, private feedsService: FeedsService) {
    this.el = el.nativeElement;
  }

  public ngOnInit(): void {
    // NGRX: FIXME: is this needed? It will reset feeds status.
    //this.feedsService.setVideoSubscription(this.feed.id, this.initial);
  }

  @Input("jhSetVideoSubscription")
  set setVideoSubscription(video: boolean) {
    /* For subscribers we have to manage the video subscription */
    if (!this.feed.isPublisher) {
      this.feedsService.setVideoSubscription(this.feed.id, video);
    }
  }

}
