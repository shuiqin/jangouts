/*
 * Copyright (C) 2016 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import { ChatComponent} from "./chat.component";
import { LogEntryComponent } from "./log-entry";
import { ChatMessageComponent } from "./chat-message";
import { ChatFormComponent } from "./chat-form";
import { AutoScrollDirective } from "./message-autoscroll.directive";

export {
  ChatComponent,
  LogEntryComponent,
  ChatMessageComponent,
  ChatFormComponent,
  AutoScrollDirective
};

export const CHAT_COMPONENTS: any[] = [
  ChatComponent,
  LogEntryComponent,
  ChatMessageComponent,
  ChatFormComponent,
  AutoScrollDirective
];
