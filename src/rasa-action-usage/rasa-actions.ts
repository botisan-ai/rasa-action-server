import { IActionDispatcher, IActionDomain, IActionTracker, IRunnableAction } from '../../sdk';
import { Action } from '../rasa-action/rasa-action.decorators';

@Action({ name: 'hello_action' })
export class HelloAction implements IRunnableAction {
  async run(tracker: IActionTracker, dispatcher: IActionDispatcher, domain: IActionDomain): Promise<void> {
    console.log(tracker, dispatcher, domain);
    return Promise.resolve(undefined);
  }
}
