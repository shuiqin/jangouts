/*
 * Copyright (C) 2016 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */


import { SigninFormComponent } from "./signin-form.component";
import { UserService } from "./user.service";

export { UserService };
export const USER_PROVIDERS: any[] = [
  UserService
];

export { SigninFormComponent };
export const USER_COMPONENTS: any[] = [
  SigninFormComponent
];
