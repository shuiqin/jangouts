/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Component, Input, OnInit } from "@angular/core";

import { ChatMessageComponent} from "./chat-message";
import { ChatFormComponent} from "./chat-form";
import { LogEntryComponent} from "./log-entry";
import { AutoScrollDirective } from "./message-autoscroll.directive";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "../reducers";
import { Message } from "../models/message";

@Component({
  selector: "jh-chat",
  template: require("./chat.component.html"),
  styles: [require("!raw!sass!./chat.component.scss")],
  entryComponents: [
    ChatFormComponent,
    ChatMessageComponent,
    LogEntryComponent
  ]
})

export class ChatComponent implements OnInit {
  messages$: Observable<Message[]>;

  @Input() public messages: any;

  constructor (private store: Store<fromRoot.IState>) {
    this.messages$ = store.select(fromRoot.getChatMessages);
  }

  public ngOnInit(): void { }
}
