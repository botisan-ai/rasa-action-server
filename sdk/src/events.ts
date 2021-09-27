import { IObjectLiteral } from './class';

export interface IEvent {
  event: string;
  data: any;

  toObject(): IObjectLiteral;
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

abstract class AbstractEvent implements IEvent {
  event: string;
  data: any;

  toObject(): IObjectLiteral {
    return {
      ...this.data,
      event: this.event,
    }
  }
}

/**
 * https://rasa.com/docs/action-server/sdk-events#slotset
 */
export class SlotSet extends AbstractEvent implements IEvent {
  event = 'slot';

  readonly data: any;

  constructor(data: ISlotSet) {
    super();
    this.data = {
      name: data.key,
      value: data.value,
      timestamp: data.timestamp,
    };
  }
}

export interface ISlotSet {
  key: string;
  value?: any;
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#allslotsreset
 */
export class AllSlotsReset extends AbstractEvent implements IEvent {
  event = 'reset_slots';

  constructor(readonly data: IAllSlotsReset) {
    super();
  }
}

export interface IAllSlotsReset {
  timestamp: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#reminderscheduled
 */
export class ReminderScheduled extends AbstractEvent implements IEvent {
  event = 'reminder';

  readonly data: any;

  constructor(data: IReminderScheduled) {
    super();
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
export class ReminderCancelled extends AbstractEvent implements IEvent {
  event = 'cancel_reminder';

  readonly data: any;

  constructor(data: IReminderCancelled) {
    super();
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
export class ConversationPaused extends AbstractEvent implements IEvent {
  event = 'pause';

  constructor(readonly data: IConversationPaused) {
    super();
  }
}

export interface IConversationPaused {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#conversationresumed
 */
export class ConversationResumed extends AbstractEvent implements IEvent {
  event = 'resume';

  constructor(readonly data: IConversationResumed) {
    super();
  }
}

export interface IConversationResumed {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#followupaction
 */
export class FollowupAction extends AbstractEvent implements IEvent {
  event = 'followup';

  constructor(readonly data: IFollowupAction) {
    super();
  }
}

export interface IFollowupAction {
  name: string;
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#userutterancereverted
 */
export class UserUtteranceReverted extends AbstractEvent implements IEvent {
  event = 'rewind';

  constructor(readonly data: IUserUtteranceReverted) {
    super();
  }
}

export interface IUserUtteranceReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#actionreverted
 */
export class ActionReverted extends AbstractEvent implements IEvent {
  event = 'undo';

  constructor(readonly data: IActionReverted) {
    super();
  }
}

export interface IActionReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#restarted
 */
export class Restarted extends AbstractEvent implements IEvent {
  event = 'restart';

  constructor(readonly data: IRestarted) {
    super();
  }
}

export interface IRestarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#sessionstarted
 */
export class SessionStarted extends AbstractEvent implements IEvent {
  event = 'session_start';

  constructor(readonly data: ISessionStarted) {
    super();
  }
}

export interface ISessionStarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#useruttered
 */
export class UserUttered extends AbstractEvent implements IEvent {
  event = 'user';

  constructor(readonly data: IUserUttered) {
    super();
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
export class BotUttered extends AbstractEvent implements IEvent {
  event = 'bot';

  constructor(readonly data: IBotUttered) {
    super();
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
export class ActionExecuted extends AbstractEvent implements IEvent {
  event = 'action';

  readonly data: any;

  constructor(data: IActionExecuted) {
    super();
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
