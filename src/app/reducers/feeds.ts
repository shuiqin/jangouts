import { IFeed } from "../models/feed";
import * as feeds from "../actions/feeds";

export interface IHighlight {
  current: number;
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

    case feeds.UPDATE_FEED: {
      const newFeed: IFeed = action.payload;
      return {
        ...state,
        feeds: state.feeds.map(oldFeed => {
          return oldFeed.id === newFeed.id ? newFeed : oldFeed;
        })
      };
    }

    default: {
      return state;
    }
  }
}

export const getFeeds = (state: IState) => state.feeds;
export const getHighlightedFeed = (state: IState) => {
  console.log("Searching for", state.highlight.current);
  return state.feeds.find(f => f.id === state.highlight.current);
}
