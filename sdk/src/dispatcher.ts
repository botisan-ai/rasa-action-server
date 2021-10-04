import { UtterMessage } from "./utterance";

export class ActionDispatcher implements IActionDispatcher {
  public messages: UtterMessage[] = [];

  utterMessage(message: UtterMessage): void {
    this.messages.push(message);
  }
}

export interface IActionDispatcher {
  /**
   * https://rasa.com/docs/action-server/sdk-dispatcher#collectingdispatcherutter_message
   */
  utterMessage(message: UtterMessage): void;

  messages: UtterMessage[];
}
