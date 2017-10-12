import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector } from "@ngrx/store";
import * as fromChat from "./chat";

// Rename to AppState (?)
export interface IState {
  chat: fromChat.IState
};

export const reducers: ActionReducerMap<IState> = {
  chat: fromChat.reducer
};

/// export const metaReducers: MetaReducer<IState>[] = [storeFreeze];
export const metaReducers: MetaReducer<IState>[] = [];

// export const getChatState = createFeatureSelector<fromLayout>("chat");
export const getChatState = (state: IState) => state.chat;
export const getChatMessages = createSelector(
  getChatState,
  fromChat.getMessages
);
