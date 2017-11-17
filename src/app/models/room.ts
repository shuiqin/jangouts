export interface IRoom {
  id: number;
  label: string;
  description: string;
  record: string;
  room: number;
  max_publishers: number;
  num_participants: number;
  fir_freq: number;
  bitrate: number;
};

export const roomToIRoom = (room) => {
  return {
    id: room.id,
    label: room.label,
    description: room.description,
    record: room.record,
    room: room.room,
    max_publishers: room.max_publishers,
    num_participants: room.num_participants,
    fir_freq: room.fir_freq,
    bitrate: room.bitrate
  };
};
