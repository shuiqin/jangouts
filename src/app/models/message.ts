/*
 * Copyright (C) 2017 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

export interface Message {
  timestamp: Date;
  type: string;
  content: {
    text: string;
    feed?: {
      isLocalScreen: boolean;
      display: string;
    };
    // FIXME: source and target may be implemented using a common interface
    source?: {
      isPublisher: boolean;
      display: string;
    };
    target?: {
      isPublisher: boolean;
      display: string;
    }
  }
}

// FIXME: improve API
export function generateMessage(data) : Message {
  const {type, text, feed, source, target} = data;
  const content = { text, feed, source, target };
  return { timestamp: new Date(), type, content };
}
