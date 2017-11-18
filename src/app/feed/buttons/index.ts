/*
 * Copyright (C) 2016 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { AudioButtonComponent } from "./audio-button.component";
import { VideoButtonComponent } from "./video-button.component";
import { IgnoreButtonComponent } from "./ignore-button.component";
import { UnpublishButtonComponent } from "./unpublish-button.component";

export {
  AudioButtonComponent,
  VideoButtonComponent,
  IgnoreButtonComponent,
  UnpublishButtonComponent
};

export const FEED_BUTTONS_COMPONENTS: any[] = [
  AudioButtonComponent,
  VideoButtonComponent,
  IgnoreButtonComponent,
  UnpublishButtonComponent
];
