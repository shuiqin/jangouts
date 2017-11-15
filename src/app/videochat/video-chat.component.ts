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
  highlight$: Observable<IFeed>;

  private highlighted: IFeed;

  constructor(
    private store: Store<fromRoot.IState>,
    private actionService: ActionService
  ) {
    this.feeds$ = store.select(fromRoot.getFeeds);

    this.messages$ = store.select(fromRoot.getChatMessages);

    this.highlight$ = store.select(fromRoot.getHighlightedFeed);
    this.highlight$.subscribe(val => {
      this.highlighted = (val === undefined) ? undefined : val;
    });
  }

  public ngOnInit(): void { }

  public mirrored(): boolean {
    if (this.highlighted) {
      return (this.highlighted.isPublisher && !this.highlighted.isLocalScreen);
    } else {
      return false;
    }
  }

  public toggleHighlightedFeed(feedId: number): void {
    this.actionService.highlightFeed(feedId);
  }

  public isHighlighted(feed: IFeed): boolean {
    if (this.highlighted === undefined) return false;
    return this.highlighted.id === feed.id;
  }

  public isHighlightedByUser(feed: IFeed): boolean {
    return this.highlighted.id == feed.id;
  }

  public showHotkeys(): void {
    // [FIX] - toggleCheatSheet not supported yet
    // this.hotkeys.toggleCheatSheet();
    console.warn("Not implemented yet");
  }

}
