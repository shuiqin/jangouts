import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromChat from "./chat";
import * as fromFeeds from "./feeds";
import * as fromRooms from "./rooms";
import * as fromUser from "./user";

export interface IState {
  chat: fromChat.IState;
  feeds: fromFeeds.IState;
  rooms: fromRooms.IState; // NGRX: include additional server info?
  user: fromUser.IState;
};

export const reducers: ActionReducerMap<IState> = {
  chat: fromChat.reducer,
  feeds: fromFeeds.reducer,
  rooms: fromRooms.reducer,
  user: fromUser.reducer
};

/// export const metaReducers: MetaReducer<IState>[] = [storeFreeze];
export const metaReducers: MetaReducer<IState>[] = [];

// export const getChatState = createFeatureSelector<fromLayout>("chat");
export const getChatState = (state: IState) => state.chat;

export const getChatMessages = createSelector(
  getChatState,
  fromChat.getMessages
);

export const getFeedsState = (state: IState) => state.feeds;
export const getFeeds = createSelector(
  getFeedsState,
  fromFeeds.getFeeds
);

export const getStickyFeed = createSelector(
  getFeedsState,
  fromFeeds.getStickyFeed
);

export const getStickyFeedByUser = createSelector(
  getFeedsState,
  fromFeeds.getStickyFeedByUser
);

export const getRoomsState = (state: IState) => state.rooms;
export const getRooms = createSelector(
  getRoomsState,
  fromRooms.getRooms
);

export const getUserState = (state: IState) => state.user;
export const getUserPrefs = createSelector(
  getUserState,
  fromUser.getUserPrefs
);
export const getUsername = createSelector(
  getUserState,
  fromUser.getUsername
);
