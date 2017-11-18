/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { IFeed } from "../models/feed";
import * as feeds from "../actions/feeds";
import { createSelector } from '@ngrx/store';

export interface ISticky {
  /* Feed currently highlighted, either manually (if byUser is set) or
   * automatically (if byUser is null) */
  feedId: number;
  /* Feed explicitly selected as highlight by the user (using the UI) */
  byUser: boolean;
}

export interface IFeedMap {
  [key: string]: IFeed;
};

export interface IState {
  feeds: IFeedMap;
  mainFeedId: number;
  sticky: ISticky;
}

const initialState: IState = {
  feeds: {},
  mainFeedId: null,
  sticky: {
    feedId: null,
    byUser: false
  }
};

export function reducer(state: IState = initialState, action: feeds.Actions): IState {
  console.log("Action:", action);

  switch (action.type) {
    case feeds.ENTER_ROOM: {
      const feed: IFeed = action.payload;
      return {
        ...state,
        feeds: { [feed.id]: feed },
        mainFeedId: feed.id,
        sticky: {
          feedId: action.payload.id,
          byUser: false
        }
      };
    }

    case feeds.ADD_FEED: {
      const feed: IFeed = action.payload;
      return {
        ...state,
        feeds: {...state.feeds, [feed.id]: feed}
      };
    }

    case feeds.UPDATE_FEED: {
      const feed: IFeed = action.payload;
      return {
        ...state,
        feeds: {...state.feeds, [feed.id]: feed}
      };
    }

    case feeds.DESTROY_FEED: {
      const feedId: number = action.payload;
      const cloned_feeds: IFeedMap = Object.assign({}, state.feeds);
      delete cloned_feeds[feedId];

      return {
        ...state,
        feeds: cloned_feeds
      };
    }

    case feeds.STICK_FEED: {
      const newFeedId: number = action.payload;
      const { feedId, byUser }: ISticky = state.sticky;

      return {
        ...state,
        sticky: {
          ...state.sticky,
          feedId: newFeedId,
          byUser: (feedId === newFeedId) ? !byUser : byUser
        }
      };
    }

    default: {
      return state;
    }
  }
}

const getFeedById = (state: IState, feedId: number) => state.feeds[feedId];
const compareFeeds = (a: IFeed, b: IFeed) => a.display.localeCompare(b.display);

export const getFeeds = (state: IState) => Object.values(state.feeds).sort(compareFeeds);

export const getMainFeed = (state: IState) => state.feeds[state.mainFeedId];

export const getStickyFeed = (state: IState) => {
  const { byUser, feedId }: ISticky = state.sticky;
  const speaking: IFeed = getFeeds(state).find(f => f.speaking);
  const feed: IFeed = getFeedById(state, feedId);

  if (feed === undefined) { // user disconnected
    return (speaking && speaking.videoEnabled) ? speaking : getMainFeed(state);
  }

  return byUser ? feed : (speaking || feed);
};

export const getStickyFeedByUser = (state: IState) => {
  const { byUser, feedId }: ISticky = state.sticky;
  if (byUser) {
    return getFeedById(state, feedId);
  }
  return undefined;
}
