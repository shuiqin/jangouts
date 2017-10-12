/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "jh-log-entry",
  template: require("./log-entry.component.html")
})
export class LogEntryComponent implements OnInit {

  @Input() public message: any;

  public text: string;

  constructor () { }

  public ngOnInit(): void {
    this.text = this.getText();
  }

  public getText(): string {
    const func = this[this.message.type + "Text"];
    return (typeof func === "function") ? func.apply(this) : this.message.type;
  }

  public muteRequestText(): string {
    let res: string;

    if (this.message.content.source.isPublisher) {
      res = "You have muted ";
    } else {
      res = this.message.content.source.display + " has muted ";
    }
    if (this.message.content.target.isPublisher) {
      res += "you";
    } else {
      res += this.message.content.target.display;
    }
    return res;
  }

  public publishScreenText(): string {
    return "Screen sharing started";
  }

  public destroyFeedText(): string {
    if (this.message.content.feed.isLocalScreen) {
      return "Screen sharing stopped";
    } else {
      return this.message.content.feed.display + " has left the room";
    }
  }

  public newRemoteFeedText(): string {
    return this.message.content.feed.display + " has joined the room";
  }

  public ignoreFeedText(): string {
    return "You are ignoring " + this.message.content.feed.display + " now";
  }

  public stopIgnoringFeedText(): string {
    return "You are not longer ignoring " + this.message.content.feed.display;
  }
}
