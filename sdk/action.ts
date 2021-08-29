import { MetadataStorage } from './metadata';
import { IConstructor } from './class';
import { IActionDispatcher } from './dispatcher';
import { IActionTracker } from './tracker';
import { IActionDomain } from './domain';

/**
 * Class decorator to mark a class as a Rasa Action
 *
 * @category PublicAPI
 */
export function Action(options: IActionOptions): Function {
  return function (target: IConstructor<IRunnableAction>): void {
    MetadataStorage.addActionMetadata({
      target,
      name: options.name,
    });
  };
}

/**
 * Action options.
 */
export interface IActionOptions {
  name: string;
}

/**
 * A runnable action definition.
 */
export interface IRunnableAction {
  run(tracker: IActionTracker, dispatcher: IActionDispatcher, domain: IActionDomain): Promise<void>;
}

export interface IAction {
  version: string;
  sender_id: string;
  next_action: string;

  tracker: {
    paused: false;
    sender_id: string;
    latest_event_time: 0;
    followup_action: null;
    latest_action_name: string;
    latest_input_channel: string;
    events: [];
    active_loop: {
      //
    };
    latest_action: {
      action_name: string;
    };
    latest_message: {
      intent: {};
      entities: [];
      text: string;
      message_id: string;
      metadata: {};
      intent_ranking: [];
      response_selector: {};
    };
    slots: {
      session_started_metadata: [];
    };
  };

  domain: {
    config: {};
    session_config: {};
    intents: [];
    entities: [];
    slots: {};
    responses: {};
    actions: [];
    forms: {};
    e2e_actions: [];
  };
}
