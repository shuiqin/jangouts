/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Action } from "@ngrx/store";
import { IFeed } from "../models/feed";

export const ENTER_ROOM = "[Feed] Enter Room";
export const ADD_FEED = "[Feed] Add Feed"
export const REMOTE_JOIN = "[Feed] Remote Join";
export const TOGGLE_CHANNEL = "[Feed] Toggle Channel";
export const UPDATE_FEED = "[Feed] Update Feed";
export const DESTROY_FEED = "[Feed] Destroy Feed";
export const STICK_FEED = "[Feed] Stick Feed";
// export const IGNORE_FEED = "[Feed] Ignore Feed";
// export const UNIGNORE_FEED = "[Feed] Un-ignore Feed";
// export const SET_MEDIA = "[Feed] Set media";

export class EnterRoomAction implements Action {
  readonly type = ENTER_ROOM;

  constructor(public payload: IFeed) {}
}

export class AddFeedAction implements Action {
  readonly type = ADD_FEED;

  constructor(public payload: IFeed) {}
}

export class RemoteJoinAction implements Action {
  readonly type = REMOTE_JOIN;

  constructor(public payload: string) {}
}

export interface IToggleChannel {
  id: number;
  channel: string;
}

export class ToggleChannelAction implements Action {
  readonly type = TOGGLE_CHANNEL;

  constructor(public payload: IToggleChannel) {}
}

export class UpdateFeedAction implements Action {
  readonly type = UPDATE_FEED;

  constructor(public payload: IFeed) {}
}

export class DestroyFeedAction implements Action {
  readonly type = DESTROY_FEED;

  constructor(public payload: number) {}
}

export class StickFeedAction implements Action {
  readonly type = STICK_FEED;

  constructor(public payload: number) {}
}

export type Actions
  = EnterRoomAction
  | AddFeedAction
  | RemoteJoinAction
  | ToggleChannelAction
  | UpdateFeedAction
  | DestroyFeedAction
  | StickFeedAction
