/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { IFeed } from "../models/feed";
import { Message } from "../models/message";
import * as fromRoot from "../reducers";
import { ActionService } from "../room/action.service";

@Component({
  selector: "jh-video-chat",
  template: require("./video-chat.component.html"),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoChatComponent implements OnInit {
  feeds$: Observable<IFeed[]>;
  messages$: Observable<Message[]>;
  stickySubscription: any;
  stickyByUserSubscription: any;

  private sticky: IFeed;
  private stickyByUser: IFeed;

  constructor(
    private store: Store<fromRoot.IState>,
    private actionService: ActionService
  ) {
  }

  public ngOnInit(): void {
    this.feeds$ = this.store.select(fromRoot.getFeeds);
    this.messages$ = this.store.select(fromRoot.getChatMessages);

    this.stickySubscription = this.store.select(fromRoot.getStickyFeed)
      .subscribe(v => this.sticky = v);

    this.stickyByUserSubscription = this.store.select(fromRoot.getStickyFeedByUser)
      .subscribe(v => this.stickyByUser = v);
  }

  public ngOnDestroy(): void {
    this.stickySubscription.unsubscribe();
    this.stickyByUserSubscription.unsubscribe();
  }

  public mirrored(): boolean {
    if (this.sticky) {
      return (this.sticky.isPublisher && !this.sticky.isLocalScreen);
    } else {
      return false;
    }
  }

  public toggleStickyFeed(feedId: number): void {
    this.actionService.toggleStickyFeed(feedId);
  }

  public isSticky(feed: IFeed): boolean {
    if (this.sticky === undefined) return false;
    return this.sticky.id === feed.id;
  }

  public isStickyByUser(feed: IFeed): boolean {
    if (this.stickyByUser == undefined) return false;
    return this.stickyByUser.id == feed.id;
  }

  public showHotkeys(): void {
    // [FIX] - toggleCheatSheet not supported yet
    // this.hotkeys.toggleCheatSheet();
    console.warn("Not implemented yet");
  }

  public trackByFeed(index: number, feed: IFeed) {
    return feed.id;
  }
}
