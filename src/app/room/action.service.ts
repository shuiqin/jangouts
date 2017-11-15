/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import * as _ from "lodash";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Broadcaster } from "../shared";
import { Feed, FeedsService } from "../feed";
import { DataChannelService } from "./data-channel.service";
import { LogService } from "./log.service";

import { Message, generateMessage } from "../models/message";

import * as feeds from "../actions/feeds";
import * as fromRoot from "../reducers";
import { IFeed, feedToIFeed } from "../models/feed";

@Injectable()
export class ActionService {

  constructor(
    private feeds: FeedsService,
    private dataChannel: DataChannelService,
    private logService: LogService,
    private broadcaster: Broadcaster,
    private store: Store<fromRoot.IState>
  ) { }

  public enterRoom(feedId: number, display: any, connection: any): void {
    let feed: Feed = new Feed();
    feed.setAttrs({
      display: display,
      connection: connection,
      id: feedId,
      isPublisher: true,
      dataChannel: this.dataChannel
    });
    this.feeds.add(feed, {main: true});
    this.store.dispatch(new feeds.EnterRoomAction(feedToIFeed(feed)));
  }

  public leaveRoom(): void {
    _.forEach(this.feeds.allFeeds(), (feed) => {
      this.destroyFeed(feed.id);
    });
  }

  public publishScreen(feedId: number, display: any, connection: any): void {
    let feed: Feed = new Feed();
    feed.setAttrs({
      display: display,
      connection: connection,
      id: feedId,
      isPublisher: true,
      isLocalScreen: true,
      dataChannel: this.dataChannel
    });
    this.feeds.add(feed);

    this.log({type: "publishScreen"})
  }

  public remoteJoin(feedId: number, display: any, connection: any): void {
    let feed: Feed = new Feed();
    feed.setAttrs({
      display: display,
      connection: connection,
      id: feedId,
      isPublisher: false,
      dataChannel: this.dataChannel
    });
    this.feeds.add(feed);
    this.store.dispatch(new feeds.AddFeedAction(feedToIFeed(feed)));
    this.log({type: "newRemoteFeed", feed});
  }

  public destroyFeed(feedId: number): void {
    let feed: Feed = this.feeds.find(feedId);
    if (feed === null) { return; }

    feed.disconnect();
    this.feeds.destroy(feedId);

    this.store.dispatch(new feeds.DestroyFeedAction(feedId));
    this.log({type: "destroyFeed", feed});
  }

  public ignoreFeed(feedId: number): void {
    let feed: Feed = this.feeds.find(feedId);
    if (feed === null) { return; }
    feed.ignore();

    this.log({type: "ignoreFeed", feed});
  }

  public stopIgnoringFeed(feedId: number, connection: any): void {
    let feed: Feed = this.feeds.find(feedId);
    if (feed === null) { return; }
    feed.stopIgnoring(connection);

    this.log({type: "stopIgnoringFeed", feed});
  }

  public writeChatMessage(text: string): Message {
    const feed = this.feeds.findMain();
    this.dataChannel.sendChatMessage(text);
    return generateMessage({type: "chatMsg", feed, text});
  }

  public toggleChannelById(type: string, feedId: number): void {
    let feed: Feed = this.feeds.find(feedId);
    this.toggleChannel(type, feed);
  }

  public toggleChannel(type: string, feed: Feed = undefined): void {
    /*
     * If no feed is provided, we are muting ourselves
     */
    if (!feed) {
      feed = this.feeds.findMain();
      if (!feed) { return; }
    }

    if (!feed.isPublisher) {
      this.log({type: "muteRequest", source: this.feeds.findMain(), target: feed});
    }

    const callback = () => this.feeds.updateIFeed(feed);
    feed.setEnabledChannel(type, !feed.isEnabled(type), {after: callback});
  }

  /**
   * Disable or enable audio or video for the main feed
   */
  public setMedia(type: string, boolval: boolean): void {
    let feed: Feed = this.feeds.findMain();
    if (!feed) { return; }

    feed.setEnabledChannel(type, boolval);
  }

  public highlightFeed(feedId: number): void {
    this.store.dispatch(new feeds.HighlightFeedAction(feedId));
  }

  private log(data): void {
    this.logService.log(data);
  }
}
