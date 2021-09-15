import { IActionServerPayload } from './action';
import { IObjectLiteral } from './class';

const NLU_FALLBACK_INTENT_NAME = 'nlu_fallback';

export class ActionTracker implements IActionTracker {
  constructor(private readonly payload: IActionServerPayload['tracker']) {
    //
  }

  currentState(): IActionServerPayload['tracker'] {
    // Deep clone the object to prevent mutation.
    return JSON.parse(JSON.stringify(this.payload));
  }

  currentSlotValues(): IObjectLiteral {
    return this.currentState().slots;
  }

  getSlot(key: string): any | void {
    const slots = this.currentSlotValues();
    if (Object.keys(slots).some((k) => key === k)) {
      return slots[key];
    }
  }

  addSlot(key: string, value: any): void {
    // TODO: implement
    console.log(key, value);
    return;
  }

  getLatestEntityValues(entityType: string, entityRole?: string, entityGroup?: string): any[] {
    const entities = this.currentState().latest_message.entities || [];
    return entities.filter((e) => e.type === entityType && (!entityRole || e.role === entityRole) && (!entityGroup || e.group === entityGroup));
  }

  isPaused(): boolean {
    return this.currentState().paused;
  }

  eventsAfterLatestRestart(): any[] {
    const events = this.currentState().events;
    const idx = events.reduce((_, e, idx) => (e.event === 'restart' ? idx : e), -1);
    return this.currentState().events.slice(idx);
  }

  getLatestInputChannel(): string | void {
    const events = this.currentState().events;
    const idx = events.reduce((_, e, idx) => (e.event === 'user' ? idx : e), -1);
    if (idx >= 0) {
      return events[idx].input_channel;
    }
  }

  getIntentOfTheLastMessage(skipFallbackIntent = true): string | void {
    const latestMessage = this.currentState().latest_message;
    if (!latestMessage) {
      return;
    }

    const intentRanking = latestMessage.intent_ranking;
    if (!intentRanking) {
      return;
    }

    const highestIntentRanking = intentRanking[0];
    if (highestIntentRanking.name === NLU_FALLBACK_INTENT_NAME && skipFallbackIntent) {
      if (intentRanking.length >= 2) {
        return intentRanking[1].name;
      }

      return;
    }

    return highestIntentRanking.name;
  }
}

export interface IActionTracker {
  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackercurrent_state
   */
  currentState(): IActionServerPayload['tracker'];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackeris_paused
   */
  isPaused(): boolean;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_latest_entity_values
   */
  getLatestEntityValues(entityType: string, entityRole?: string, entityGroup?: string): any[];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_latest_input_channel
   */
  getLatestInputChannel(): string | void;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerevents_after_latest_restart
   */
  eventsAfterLatestRestart(): any[];

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_slot
   */
  getSlot(key: string): any | void;

  addSlot(key: string, value: any): void;

  /**
   * https://rasa.com/docs/action-server/sdk-tracker#trackerget_intent_of_latest_message
   */
  getIntentOfTheLastMessage(skipFallbackIntent?: boolean): string | void;
}
