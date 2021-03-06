import { IActionServerPayload } from './action';
import { IObjectLiteral } from './class';
import { convertToEventClass, EventType, SlotSet } from './events';

const NLU_FALLBACK_INTENT_NAME = 'nlu_fallback';

export class ActionTracker implements IActionTracker {
  public readonly senderId: string;
  private slots: IObjectLiteral;
  public readonly latestMessage: IObjectLiteral;

  public readonly events: EventType[];

  private paused: boolean;
  public readonly followupAction: string | undefined;
  public readonly activeLoop: IObjectLiteral;
  public readonly latestActionName: string;

  // consider the payload as the initial state of the tracker
  constructor(payload: IActionServerPayload['tracker']) {
    this.senderId = payload.sender_id;
    this.slots = payload.slots;
    this.latestMessage = payload.latest_message || {};
    this.events = payload.events.map(convertToEventClass);
    this.paused = payload.paused;
    this.followupAction = payload.followup_action;
    this.activeLoop = payload.active_loop;
    this.latestActionName = payload.latest_action_name || payload.latest_action.action_name;
  }

  currentState(): IActionServerPayload['tracker'] {
    let latestEventTime: number | null = null;
    if (this.events.length > 0) {
      latestEventTime = this.events[this.events.length - 1].timestamp;
    }

    // Deep clone the object to prevent mutation.
    return JSON.parse(JSON.stringify({
      sender_id: this.senderId,
      slots: this.slots,
      latest_message: this.latestMessage,
      latest_event_time: latestEventTime,
      paused: this.isPaused(),
      // TODO: do type conversion on the event classes
      events: this.events,
      latest_input_channel: this.getLatestInputChannel(),
      active_loop: this.activeLoop,
      latest_action_name: this.latestActionName,
    }));
  }

  currentSlotValues(): IObjectLiteral {
    return this.slots;
  }

  getSlot(key: string): any {
    if (!Object.keys(this.slots).some((k) => key === k)) {
      // TODO: log here and notify a non-existent slot is being fetched
      return undefined;
    }

    return this.slots[key];
  }

  // TODO: official SDK is addSlots, but we are doing addSlot
  addSlot(key: string, value: any): void {
    this.slots[key] = value;
    this.events.push(new SlotSet({
      key,
      value,
    }));
  }

  getLatestEntityValues(entityType: string, entityRole?: string, entityGroup?: string): any[] {
    const entities = this.latestMessage.entities || [];
    return entities.filter((e) => e.type === entityType && (!entityRole || e.role === entityRole) && (!entityGroup || e.group === entityGroup));
  }

  isPaused(): boolean {
    return this.paused;
  }

  eventsAfterLatestRestart(): any[] {
    // TODO: should use EventType check
    const idx: number = this.events.reduce(
      (latest: number, e: EventType, i: number) => e.event === 'restart' ? i + 1 : latest,
      0,
    );
    return this.events.slice(idx);
  }

  getLatestInputChannel(): string | null {
    // TODO: should use EventType check
    const idx: number = this.events.reduce(
      (latest: number, e: EventType, i: number) => e.event === 'user' ? i : latest,
      -1,
    );

    if (idx >= 0) {
      return (this.events[idx] as any).input_channel;
    }

    return null;
  }

  getIntentOfTheLastMessage(skipFallbackIntent = true): string | undefined {
    if (!this.latestMessage) {
      return undefined;
    }

    const intentRanking = this.latestMessage.intent_ranking;
    if (!intentRanking) {
      return undefined;
    }

    const highestIntentRanking = intentRanking[0];
    if (highestIntentRanking.name === NLU_FALLBACK_INTENT_NAME && skipFallbackIntent) {
      if (intentRanking.length >= 2) {
        return intentRanking[1].name;
      }

      return undefined;
    }

    return highestIntentRanking.name;
  }

  clone(): IActionTracker {
    return new ActionTracker(this.currentState());
  }

  slotsToValidate(): IObjectLiteral {
    const slotValues: IObjectLiteral = {};

    // shallow copy should be enough here
    const reversedEvents = this.events.slice().reverse();

    for (const event of reversedEvents) {
      if (event instanceof SlotSet) {
        slotValues[event.name] = event.value;
      } else {
        break;
      }
    }

    return slotValues;
  }

  // TODO: equals operator
  // TODO: getLastEventFor(eventType, excludeNames)
  // TODO: appliedEvents() -> returns all actions that sohould be applied to the tracker, without the reverted events
}

export interface IActionTracker {
  senderId: string;
  latestMessage: IObjectLiteral;
  events: IObjectLiteral[];
  followupAction: string | undefined;
  activeLoop: IObjectLiteral;
  latestActionName: string;

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
  getLatestInputChannel(): string | null;

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

  clone(): IActionTracker;

  slotsToValidate(): IObjectLiteral;
}
