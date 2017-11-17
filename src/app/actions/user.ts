import { Action } from "@ngrx/store";
import { IUserSession, IUserPrefs } from "../models/user";

export const SIGN_IN = "[User] Sign In";
export const SIGN_IN_SUCCESS = "[User] Sign In Success";
export const SIGN_IN_FAIL = "[User] Sign In Fail";
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

export interface ISignInActionPayload {
  username: string;
  roomId: number;
}

export class SignInAction implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: ISignInActionPayload) {};
}

export class SignInSuccessAction implements Action {
  readonly type = SIGN_IN_SUCCESS;

  constructor(public payload: ISignInActionPayload) {};
}

export class SignInFailAction implements Action {
  readonly type = SIGN_IN_FAIL;

  constructor() {};
}

export type Actions
  = LoadPrefsAction
  | LoadPrefsSuccessAction
  | SavePrefsAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailAction
