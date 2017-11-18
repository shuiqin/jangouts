/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { Feed } from "../feed/shared/feed.model";

export interface IFeed {
  id: number;
  display: string;
  audioEnabled: boolean;
  isHighlighted: boolean;
  isIgnored: boolean;
  isLocalScreen: boolean;
  isPublisher: boolean;
  isSilent: boolean;
  picture: string | null;
  speaking: boolean;
  videoEnabled: boolean;
  videoSubscription: boolean;
}

// FIXME: improve API
export function feedToIFeed(feed: Feed): IFeed {
  return {
    id: feed.id,
    display: feed.display,
    audioEnabled: feed.getAudioEnabled(),
    isHighlighted: false,
    isIgnored: feed.isIgnored,
    isLocalScreen: feed.isLocalScreen,
    isPublisher: feed.isPublisher,
    isSilent: true,
    picture: feed.getPicture(),
    speaking: feed.getSpeaking(),
    videoEnabled: feed.getVideoEnabled(),
    videoSubscription: feed.getVideoSubscription()
  };
}
