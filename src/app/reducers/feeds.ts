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

export interface IState {
  feeds: IFeed[];
  sticky: ISticky;
}

const initialState: IState = {
  feeds: [],
  sticky: {
    feedId: null,
    byUser: false
  }
};

export function reducer(state: IState = initialState, action: feeds.Actions): IState {
  console.log("Action:", action);

  switch (action.type) {
    case feeds.ENTER_ROOM: {
      return {
        ...state,
        feeds: [action.payload],
        sticky: {
          feedId: action.payload.id,
          byUser: false
        }
      };
    }

    case feeds.ADD_FEED: {
      return {
        ...state,
        feeds: [...state.feeds, action.payload]
      };
    }

    case feeds.UPDATE_FEED: {
      const newFeed: IFeed = action.payload;
      return {
        ...state,
        feeds: state.feeds.map(oldFeed => {
          return oldFeed.id === newFeed.id ? newFeed : oldFeed;
        })
      };
    }

    case feeds.DESTROY_FEED: {
      const feedId: number = action.payload;

      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.id !== feedId)
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

const getFeedById = (state: IState, feedId: number) => state.feeds.find(f => f.id === feedId);

export const getFeeds = (state: IState) => state.feeds;

export const getOwnFeed = (state: IState) => state.feeds[0];

export const getStickyFeed = (state: IState) => {
  const { byUser, feedId }: ISticky = state.sticky;
  const speaking: IFeed = state.feeds.find(f => f.speaking);
  const feed: IFeed = getFeedById(state, feedId);

  if (feed === undefined) { // user disconnected
    return (speaking && speaking.videoEnabled) ? speaking : getOwnFeed(state);
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
