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
