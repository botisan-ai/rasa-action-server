import { IObjectLiteral } from './class';
import { UtterMessage } from './utterance';
import { IActionTracker } from './tracker';

export interface INLGResponder {
  /**
   *
   * @param response
   * @param args
   * @param tracker
   * @param channel
   */
  run(response: string, args: IObjectLiteral, tracker: IActionTracker, channel: IObjectLiteral & { name: string }): Promise<UtterMessage>;
}
