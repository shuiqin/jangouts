import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/fromPromise";

import * as rooms from "../actions/rooms";
import { RoomService } from "../room/room.service";
import { IRoom, roomToIRoom } from "../models/room";

@Injectable()
export class RoomsEffects {

  @Effect()
  loadRooms$: Observable<Action> = this.actions$
    .ofType(rooms.LOAD_ROOMS)
    .switchMap(_action => Observable.fromPromise(this.roomService.getRooms()))
    .map(r => new rooms.LoadRoomsSuccessAction(r.map(roomToIRoom)));

  constructor(private actions$: Actions, private roomService: RoomService) {};
}
