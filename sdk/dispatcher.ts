export class ActionDispatcher implements IActionDispatcher {
  public get messages() {
    throw new Error('Not implemented');
  }

  utterMessage(message: UtterMessage): void {
    const messages = Object.keys(message);
    throw new Error('Not implemented' + messages.join(', '));
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

  messages: any;
}
