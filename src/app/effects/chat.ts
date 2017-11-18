/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import * as chat from "../actions/chat";
import { ActionService } from "../room/action.service";
import { Message } from "../models/message";

@Injectable()
export class ChatEffects {

  @Effect()
  sendChatMessage$: Observable<Action> = this.actions$
    .ofType(chat.SEND_CHAT_MESSAGE)
    .map((action: chat.SendChatMessageAction) => this.actionService.writeChatMessage(action.payload))
    .map((message: Message) => {
      return new chat.AddMessageAction(message);
    });

  constructor(private actions$: Actions, private actionService: ActionService) {};
}
