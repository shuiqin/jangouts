import { Action } from "@ngrx/store";
import { Message } from "../models/message";

export const ADD_MESSAGE  = "[Message] Add Message to Chat";
export const SEND_CHAT_MESSAGE = "[Message] Send Chat Message";

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: Message) {}
}

export class SendChatMessageAction implements Action {
  readonly type = SEND_CHAT_MESSAGE;

  constructor(public payload: string) {}
}

export type Actions
  = AddMessageAction
  | SendChatMessageAction
