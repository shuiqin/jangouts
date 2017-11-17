import { Action } from "@ngrx/store";
import { IUserPrefs } from "../models/user";

export const SIGN_IN = "[User] Sign In";
export const LOAD_PREFS = "[User] Load Prefs";
export const LOAD_PREFS_SUCCESS = "[User] Load Prefs Success";
export const SAVE_PREFS = "[User] Save Prefs";

export class LoadPrefsAction implements Action {
  readonly type = LOAD_PREFS;
}

export class LoadPrefsSuccessAction implements Action {
  readonly type = LOAD_PREFS_SUCCESS;

  constructor(public payload: IUserPrefs) {};
}

export class SavePrefsAction implements Action {
  readonly type = SAVE_PREFS;

  constructor(public payload: IUserPrefs) {};
}

export type Actions
  = LoadPrefsAction
  | LoadPrefsSuccessAction
  | SavePrefsAction
