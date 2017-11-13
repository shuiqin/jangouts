import { Action } from "@ngrx/store";
import { IFeed } from "../models/feed";

export const ENTER_ROOM = "[Feed] Enter Room";
export const REMOTE_JOIN = "[Feed] Remote Join";
export const TOGGLE_CHANNEL = "[Feed] Toggle Channel";
export const UPDATE_FEED = "[Feed] Update Feed"
export const REFRESH_FEED = "[Feed] Refresh feed"
// export const IGNORE_FEED = "[Feed] Ignore Feed";
// export const UNIGNORE_FEED = "[Feed] Un-ignore Feed";
// export const SET_MEDIA = "[Feed] Set media";

export class EnterRoomAction implements Action {
  readonly type = ENTER_ROOM;

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

export class RefreshFeedAction implements Action {
  readonly type = REFRESH_FEED;

  constructor(public payload: Number) {}
}

export type Actions
  = EnterRoomAction
  | RemoteJoinAction
  | ToggleChannelAction
  | UpdateFeedAction
