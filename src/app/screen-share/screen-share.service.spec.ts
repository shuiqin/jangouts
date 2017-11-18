/*
 * Copyright (C) 2016 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { ScreenShareService } from "./screen-share.service";

describe("Service: ScreenShareService", () => {

  beforeEach(() => {
    this.screenShareService = new ScreenShareService();
  });

  it("should return default value for inProgress", () => {
    expect(this.screenShareService.getInProgress()).toBe(false);
  });

  it("should return setted value for inProgress", () => {
    this.screenShareService.setInProgress(true);
    expect(this.screenShareService.getInProgress()).toBe(true);
  });

});
