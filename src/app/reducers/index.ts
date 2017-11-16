import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromChat from "./chat";
import * as fromFeeds from "./feeds";

export interface IState {
  chat: fromChat.IState;
  feeds: fromFeeds.IState;
};

export const reducers: ActionReducerMap<IState> = {
  chat: fromChat.reducer,
  feeds: fromFeeds.reducer
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
)
