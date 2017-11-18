/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Action } from "@ngrx/store";
import { IRoom } from "../models/room";

export const LOAD_ROOMS = "[Room] Load Rooms";
export const LOAD_ROOMS_SUCCESS = "[Room] Load Rooms Success";
export const LOAD_ROOMS_FAIL = "[Room] Load Rooms Failed";

export class LoadRoomsAction implements Action {
  readonly type = LOAD_ROOMS;

  constructor() {}
};


export class LoadRoomsSuccessAction implements Action {
  readonly type = LOAD_ROOMS_SUCCESS;

  constructor(public payload: IRoom[]) {}
};
export class LoadRoomsFailAction implements Action {
  readonly type = LOAD_ROOMS_FAIL;

  constructor(public payload: string) {}
};

export type Actions
  = LoadRoomsAction
  | LoadRoomsSuccessAction
  | LoadRoomsFailAction
