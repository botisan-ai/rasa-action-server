import { IObjectLiteral } from './class';

export interface IEvent<T> {
  data: T;
}

export type AllEventTypes =
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
export class SlotSet implements IEvent<ISlotSet> {
  constructor(readonly data: ISlotSet) {
    //
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
export class AllSlotsReset implements IEvent<IAllSlotsReset> {
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
export class ReminderScheduled implements IEvent<IReminderScheduled> {
  constructor(readonly data: IReminderScheduled) {
    //
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
export class ReminderCancelled implements IEvent<IReminderCancelled> {
  constructor(readonly data: IReminderCancelled) {
    //
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
export class ConversationPaused implements IEvent<IConversationPaused> {
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
export class ConversationResumed implements IEvent<IConversationResumed> {
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
export class FollowupAction implements IEvent<IFollowupAction> {
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
export class UserUtteranceReverted implements IEvent<IUserUtteranceReverted> {
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
export class ActionReverted implements IEvent<IActionReverted> {
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
export class Restarted implements IEvent<IRestarted> {
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
export class SessionStarted implements IEvent<ISessionStarted> {
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
export class UserUttered implements IEvent<IUserUttered> {
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
export class BotUttered implements IEvent<IBotUttered> {
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
export class ActionExecuted implements IEvent<IActionExecuted> {
  constructor(readonly data: IActionExecuted) {
    //
  }
}

export interface IActionExecuted {
  action_name: string;
  policy?: any;
  confidence?: number;
  timestamp?: number;
}
