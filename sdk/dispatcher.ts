export class ActionDispatcher implements IActionDispatcher {
  public readonly messages: any[] = [];

  utterMessage(message: UtterMessage): void {
    this.messages.push(message);
  }
}

/**
 * https://rasa.com/docs/action-server/sdk-dispatcher#parameters
 */
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
