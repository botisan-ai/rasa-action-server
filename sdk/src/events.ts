import { IObjectLiteral } from './class';

export interface IEvent {
  event: string;
  data: any;
}

export type EventType =
  | SlotSet
  | AllSlotsReset
  | ReminderScheduled
  | ReminderCancelled
  | ConversationPaused
  | ConversationResumed
  | FollowupAction
  | UserUtteranceReverted
  | ActionReverted
  | Restarted
  | SessionStarted
  | UserUttered
  | BotUttered
  | ActionExecuted;

/**
 * https://rasa.com/docs/action-server/sdk-events#slotset
 */
export class SlotSet implements IEvent {
  event = 'slot';

  readonly data: any;

  constructor(data: ISlotSet) {
    this.data = {
      name: data.key,
      value: data.value,
      timestamp: data.timestamp,
    };
  }
}

export interface ISlotSet {
  key: string;
  value?: string;
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#allslotsreset
 */
export class AllSlotsReset implements IEvent {
  event = 'reset_slots';

  constructor(readonly data: IAllSlotsReset) {
    //
  }
}

export interface IAllSlotsReset {
  timestamp: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#reminderscheduled
 */
export class ReminderScheduled implements IEvent {
  event = 'reminder';

  readonly data: any;

  constructor(data: IReminderScheduled) {
    this.data = {
      name: data.name,
      entities: data.entities,
      intent: data.intent_name,
      timestamp: data.timestamp,
      date_time: data.trigger_date_time.toISOString(),
      kill_on_user_msg: data.kill_on_user_message,
    };
  }
}

export interface IReminderScheduled {
  name?: string;
  timestamp: number;
  intent_name: string;
  trigger_date_time: Date;
  kill_on_user_message: boolean;
  entities?: IObjectLiteral | IObjectLiteral<string>;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#remindercancelled
 */
export class ReminderCancelled implements IEvent {
  event = 'cancel_reminder';

  readonly data: any;

  constructor(data: IReminderCancelled) {
    this.data = {
      name: data.name,
      entities: data.entities,
      intent: data.intent_name,
      timestamp: data.timestamp,
    };
  }
}

export interface IReminderCancelled {
  name?: string;
  intent_name?: string;
  entities?: IObjectLiteral | IObjectLiteral<string>;
  timestamp: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#conversationpaused
 */
export class ConversationPaused implements IEvent {
  event = 'pause';

  constructor(readonly data: IConversationPaused) {
    //
  }
}

export interface IConversationPaused {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#conversationresumed
 */
export class ConversationResumed implements IEvent {
  event = 'resume';

  constructor(readonly data: IConversationResumed) {
    //
  }
}

export interface IConversationResumed {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#followupaction
 */
export class FollowupAction implements IEvent {
  event = 'followup';

  constructor(readonly data: IFollowupAction) {
    //
  }
}

export interface IFollowupAction {
  name: string;
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#userutterancereverted
 */
export class UserUtteranceReverted implements IEvent {
  event = 'rewind';

  constructor(readonly data: IUserUtteranceReverted) {
    //
  }
}

export interface IUserUtteranceReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#actionreverted
 */
export class ActionReverted implements IEvent {
  event = 'undo';

  constructor(readonly data: IActionReverted) {
    //
  }
}

export interface IActionReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#restarted
 */
export class Restarted implements IEvent {
  event = 'restart';

  constructor(readonly data: IRestarted) {
    //
  }
}

export interface IRestarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#sessionstarted
 */
export class SessionStarted implements IEvent {
  event = 'session_start';

  constructor(readonly data: ISessionStarted) {
    //
  }
}

export interface ISessionStarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#useruttered
 */
export class UserUttered implements IEvent {
  event = 'user';

  constructor(readonly data: IUserUttered) {
    //
  }
}

export interface IUserUttered {
  text?: string;
  timestamp?: number;
  parse_data?: IObjectLiteral;
  input_channel?: string;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#botuttered
 */
export class BotUttered implements IEvent {
  event = 'bot';

  constructor(readonly data: IBotUttered) {
    //
  }
}

export interface IBotUttered {
  text?: string;
  data?: IObjectLiteral;
  metadata?: IObjectLiteral;
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#actionexecuted
 */
export class ActionExecuted implements IEvent {
  event = 'action';

  readonly data: any;

  constructor(data: IActionExecuted) {
    this.data = {
      policy: data.policy,
      name: data.action_name,
      timestamp: data.timestamp,
      confidence: data.confidence,
    };
  }
}

export interface IActionExecuted {
  action_name: string;
  policy?: any;
  confidence?: number;
  timestamp?: number;
}
