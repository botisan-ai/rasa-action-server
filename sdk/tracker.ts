import { IAction } from './action';

export class ActionTracker implements IActionTracker {
  constructor(private readonly payload: IAction['tracker']) {
    //
  }

  currentState(): IAction['tracker'] {
    throw new Error('Not implemented');
  }

  getLatestEntityValues(entityType: string, entityRole?: string, entityGroup?: string): any[] | undefined {
    throw new Error('Not implemented');
  }

  paused(): boolean {
    throw new Error('Not implemented');
  }

  eventsAfterLatestRestart(): any[] {
    throw new Error('Not implemented');
  }

  getLatestInputChannel(): string | undefined {
    throw new Error('Not implemented');
  }

  getSlot(key: string): any {
    throw new Error('Not implemented');
  }

  getIntentOfTheLastMessage(skipFallbackIntent = true): string | undefined {
    throw new Error('Not implemented');
  }
}

export interface IActionTracker {
  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackercurrent_state
   */
  currentState(): IAction['tracker'];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackeris_paused
   */
  paused(): boolean;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_latest_entity_values
   */
  getLatestEntityValues(entityType: string, entityRole?: string, entityGroup?: string): any[];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_latest_input_channel
   */
  getLatestInputChannel(): string | undefined;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerevents_after_latest_restart
   */
  eventsAfterLatestRestart(): any[];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_slot
   */
  getSlot(key: string): any | undefined;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_intent_of_latest_message
   */
  getIntentOfTheLastMessage(skipFallbackIntent?: boolean): string | undefined;
}
