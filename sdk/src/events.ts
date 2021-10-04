import { plainToClass } from 'class-transformer';
import { IObjectLiteral } from './class';

export interface IEvent {
  event: string;
  timestamp: number;
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
  | ActionExecuted
  | ActiveLoop
  | UserFeaturization;

class AbstractEvent implements IEvent {
  public event: string;
  public timestamp: number;

  constructor(event: string) {
    this.event = event;
    // unix epoch seconds
    this.timestamp = new Date().getTime() / 1000;
  }
}

/**
 * https://rasa.com/docs/action-server/sdk-events#slotset
 */
export class SlotSet extends AbstractEvent {
  public name: string;
  public value: any;

  constructor(data: ISlotSet) {
    super('slot');
    if (!data) {
      return;
    }
    this.name = data.key;
    this.value = data.value;

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
  constructor(readonly data: IAllSlotsReset) {
    super('reset_slots');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IAllSlotsReset {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#reminderscheduled
 */
export class ReminderScheduled extends AbstractEvent implements IEvent {
  public name?: string;
  public entities?: IObjectLiteral | IObjectLiteral<string>;
  public intent: string;
  public date_time: string;
  public kill_on_user_msg: boolean;

  constructor(data: IReminderScheduled) {
    super('reminder');

    if (!data) {
      return;
    }

    this.name = data.name;
    this.entities = data.entities;
    this.intent = data.intent_name;
    this.date_time = data.trigger_date_time.toISOString();
    this.kill_on_user_msg = data.kill_on_user_message;

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
  public name?: string;
  public intent?: string;
  public entities?: IObjectLiteral | IObjectLiteral<string>;

  constructor(data: IReminderCancelled) {
    super('cancel_reminder');

    if (!data) {
      return;
    }

    this.name = data.name;
    this.entities = data.entities;
    this.intent = data.intent_name;

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
  constructor(readonly data: IConversationPaused) {
    super('pause');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IConversationPaused {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#conversationresumed
 */
export class ConversationResumed extends AbstractEvent implements IEvent {
  constructor(readonly data: IConversationResumed) {
    super('resume');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IConversationResumed {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#followupaction
 */
export class FollowupAction extends AbstractEvent implements IEvent {
  public name: string;

  constructor(readonly data: IFollowupAction) {
    super('followup');

    if (!data) {
      return;
    }

    this.name = data.name;

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
  constructor(readonly data: IUserUtteranceReverted) {
    super('rewind');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IUserUtteranceReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#actionreverted
 */
export class ActionReverted extends AbstractEvent implements IEvent {
  constructor(readonly data: IActionReverted) {
    super('undo');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IActionReverted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#restarted
 */
export class Restarted extends AbstractEvent implements IEvent {
  constructor(readonly data: IRestarted) {
    super('restart');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IRestarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#sessionstarted
 */
export class SessionStarted extends AbstractEvent implements IEvent {
  constructor(readonly data: ISessionStarted) {
    super('session_start');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface ISessionStarted {
  timestamp?: number;
}

/**
 * https://rasa.com/docs/action-server/sdk-events#useruttered
 * TODO
 */
export class UserUttered extends AbstractEvent implements IEvent {
  constructor(readonly data: IUserUttered) {
    super('user');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
 * TODO
 */
export class BotUttered extends AbstractEvent implements IEvent {
  constructor(readonly data: IBotUttered) {
    super('bot');

    if (!data) {
      return;
    }

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
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
  public name: string;
  public policy?: any;
  public confidence?: number;

  constructor(data: IActionExecuted) {
    super('action');

    if (!data) {
      return;
    }

    this.name = data.action_name;
    this.policy = data.policy;
    this.confidence = data.confidence;
    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IActionExecuted {
  action_name: string;
  policy?: any;
  confidence?: number;
  timestamp?: number;
}

export class ActiveLoop extends AbstractEvent implements IEvent {
  public name: string | null;

  constructor(data: IActiveLoop) {
    super('active_loop');

    if (!data) {
      return;
    }

    this.name = data.name;
    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IActiveLoop {
  name: string | null;
  timestamp?: number;
}

export class UserFeaturization extends AbstractEvent implements IEvent {
  public use_text_for_featurization?: boolean;

  constructor(data: IUserFeaturization) {
    super('user_featurization');

    if (!data) {
      return;
    }

    this.use_text_for_featurization = data.use_text_for_featurization;

    if (data.timestamp) {
      this.timestamp = data.timestamp;
    }
  }
}

export interface IUserFeaturization {
  use_text_for_featurization?: boolean;
  timestamp?: number;
}

export function convertToEventClass(obj: any): EventType {
  switch (obj.event) {
    case 'slot':
      return plainToClass(SlotSet, obj) as unknown as EventType;
    case 'reset_slots':
      return plainToClass(AllSlotsReset, obj) as unknown as EventType;
    case 'reminder':
      return plainToClass(ReminderScheduled, obj) as unknown as EventType;
    case 'cancel_reminder':
      return plainToClass(ReminderCancelled, obj) as unknown as EventType;
    case 'pause':
      return plainToClass(ConversationPaused, obj) as unknown as EventType;
    case 'resume':
      return plainToClass(ConversationResumed, obj) as unknown as EventType;
    case 'followup':
      return plainToClass(FollowupAction, obj) as unknown as EventType;
    case 'rewind':
      return plainToClass(UserUtteranceReverted, obj) as unknown as EventType;
    case 'undo':
      return plainToClass(ActionReverted, obj) as unknown as EventType;
    case 'restart':
      return plainToClass(Restarted, obj) as unknown as EventType;
    case 'session_started':
      return plainToClass(SessionStarted, obj) as unknown as EventType;
    case 'user':
      return plainToClass(UserUttered, obj) as unknown as EventType;
    case 'bot':
      return plainToClass(BotUttered, obj) as unknown as EventType;
    case 'action':
      return plainToClass(ActionExecuted, obj) as unknown as EventType;
    case 'active_loop':
      return plainToClass(ActiveLoop, obj) as unknown as EventType;
    case 'user_featurization':
      return plainToClass(UserFeaturization, obj) as unknown as EventType;
    default:
      throw new Error(`unknown action: ${obj.event}`);
  }
}
