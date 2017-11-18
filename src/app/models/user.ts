/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

export interface IUserPrefs {
  lastUsername: string;
  lastRoom: number;
  loaded: boolean;
};

export interface IUserSession {
  username: string;
  roomId: number;
  status: string; // "ok", "failed" or null
};

export interface IUser {
  session: IUserSession;
  prefs: IUserPrefs;
};
