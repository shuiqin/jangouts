/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Injectable } from "@angular/core";

import { Broadcaster } from "../shared";
import { Feed, FeedsService } from "../feed";
import { LogService } from "./log.service";

@Injectable()
export class DataChannelService {

  constructor(private feedsService: FeedsService,
              private logService: LogService,
              private broadcaster: Broadcaster) { }

  public receiveMessage(data: string, remoteId: number): void {
    let msg: any = JSON.parse(data);
    let type: string = msg.type;
    let content: any = msg.content;
    let feed: Feed;

    if (type === "chatMsg") {
      let feed = this.feedsService.find(remoteId);
      this.logService.log({type, text: content, feed, source: null, target: null});

    } else if (type === "muteRequest") {

      let source = this.feedsService.find(remoteId);
      let target = this.feedsService.find(content.target);

      if (target.isPublisher) {
         target.setEnabledChannel("audio", false, {
           after: () => {
             // NGRX: TODO
             this.feedsService.updateIFeed(target);
             this.broadcaster.broadcast("muted.byRequest");
           }
         });
      }

      // TODO: improve API
      this.logService.log({type, text: null, feed: null, source, target});

    } else if (type === "statusUpdate") {

      feed = this.feedsService.find(content.source);

      if (feed && !feed.isPublisher) {
        feed.setStatus(content.status);
        // NGRX: ?
        this.feedsService.updateIFeed(feed);
      }

    } else {
      console.log("Unknown data type: " + type);
    }
  }

  public sendMuteRequest(feed: Feed): void {
    let content: any = {
      target: feed.id,
    };

    this.sendMessage("muteRequest", content);
  }

  public sendStatus(feed: Feed, statusOptions?: any): void {
    let content: any = {
      source: feed.id,
      status: feed.getStatus(statusOptions)
    };

    this.sendMessage("statusUpdate", content);
  }

  public sendChatMessage(text: string): void {
    this.sendMessage("chatMsg", text);
  }

  private sendMessage(type: string, content: any): void {
    let text: string = JSON.stringify({
      type: type,
      content: content
    });

    let mainFeed: Feed = this.feedsService.findMain();

    if (mainFeed === null) { return; }

    if (!mainFeed.isDataOpen()) {
      console.log("Data channel not open yet. Skipping");
      return;
    }

    let connection: any = mainFeed.connection;
    connection.sendData({
      text: text,
      error: (reason) => {
        alert(reason);
      },
      success: () => {
        console.log("Data sent: " + type);
      }
    });
  }
}
