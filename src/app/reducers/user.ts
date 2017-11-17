import { IUserSession, IUserPrefs } from "../models/user";
import * as user from "../actions/user";

export interface IState {
  session: IUserSession;
  prefs: IUserPrefs;
};

const initialState: IState = {
  session: null,
  prefs: null
};

export const reducer = (state: IState = initialState, action: user.Actions) => {
  switch (action.type) {
    case user.LOAD_PREFS_SUCCESS: {
      return {
        ...state,
        prefs: action.payload
      };
    }

    case user.SIGN_IN: {
      return {
        ...state,
        session: null
      }
    }

    case user.SIGN_IN_SUCCESS: {
      return {
        ...state,
        session: {...action.payload, status: "ok"}
      };
    }

    case user.SIGN_IN_FAIL: {
      return {
        ...state,
        session: <IUserSession>{ status: "fail"}
      };
    }

    default: {
      return state;
    }
  }
}

export const getUserPrefs = (state: IState) => state.prefs;
export const getUserSession = (state: IState) => state.session;
export const getUsername = (state: IState) => state.session.username;
