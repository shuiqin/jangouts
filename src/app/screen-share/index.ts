/*
 * Copyright (C) 2016 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */


export { ScreenShareButtonComponent } from "./screen-share-button.component";
export { ScreenShareHintComponent } from "./screen-share-hint.component";
import { ScreenShareService } from "./screen-share.service";

export { ScreenShareService };
export const SCREEN_SHARE_PROVIDERS: any [] = [
  ScreenShareService
];
