import { IFeed } from "../models/feed";
import * as feeds from "../actions/feeds";

export interface IHighlight {
  /* Feed currently highlighted, either manually (if byUser is set) or
   * automatically (if byUser is null) */
  current: number;
  /* Feed explicitly selected as highlight by the user (using the UI) */
  byUser: number;
}

export interface IState {
  feeds: IFeed[];
  highlight: IHighlight;
}

const initialState: IState = {
  feeds: [],
  highlight: {
    current: null,
    byUser: null
  }
};

export function reducer(state: IState = initialState, action: feeds.Actions): IState {
  console.log("Action:", action);

  switch (action.type) {
    case feeds.ENTER_ROOM: {
      return {
        ...state,
        feeds: [action.payload],
        highlight: {
          current: action.payload.id,
          byUser: null
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
      }
    }

    case feeds.HIGHLIGHT_FEED: {
      const feedId: number = action.payload;

      return {
        ...state,
        highlight: { current: feedId, byUser: feedId }
      };
    }

    default: {
      return state;
    }
  }
}

export const getFeeds = (state: IState) => state.feeds;
// export const getSpeaking = (state: IState) => state.feeds.filter(f => f.speaking);
export const getHighlightedFeed = (state: IState) => {
  // NGRX: TODO
  return state.feeds.find(f => f.id === state.highlight.current);
}
