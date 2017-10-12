/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as chat from "../actions/chat";
import * as fromRoot from "../reducers";
import { Message } from "../models/message";

import { LogEntry } from "./logentry.model";

@Injectable()
export class LogService {

  public entries: Array<LogEntry> = [];

  constructor(private store: Store<fromRoot.IState>) { }

  // XXX
  public add(entry: LogEntry): void {
    this.entries.push(entry);
  }

  // XXX
  public allEntries(): Array<LogEntry> {
    return this.entries;
  }

  public log({type, text, feed, source, target}) {
    const content = { text, feed, source, target };
    const message: Message = { timestamp: new Date(), type, content };
    this.store.dispatch(new chat.AddMessageAction(message));
  }

}
