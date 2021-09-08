export class ActionDispatcher implements IActionDispatcher {
  private readonly _messages: any[] = [];

  public get messages() {
    // Return a deep clone to prevent mutations.
    return JSON.parse(JSON.stringify(this._messages));
  }

  utterMessage(message: UtterMessage): void {
    this._messages.push(message);
  }
}

/**
 * https://rasa.com/docs/action-server/sdk-dispatcher#parameters
 */
// prettier-ignore
export type UtterMessageType =
  | 'text'
  | 'image'
  | 'json_message'
  | 'response'
  | 'attachment'
  | 'buttons'
  | 'elements'
  | string;

export type UtterMessage = {
  [key in UtterMessageType]: any;
};

export interface IActionDispatcher {
  /**
   * https://rasa.com/docs/action-server/sdk-dispatcher#collectingdispatcherutter_message
   */
  utterMessage(message: UtterMessage): void;

  messages: any[];
}
