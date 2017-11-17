export interface IUserPrefs {
  lastUsername: string;
  lastRoom: number;
  loaded: boolean;
};

export interface IUserSession {
  username: string;
  roomId: number;
};

export interface IUser {
  session: IUserSession;
  prefs: IUserPrefs;
};
