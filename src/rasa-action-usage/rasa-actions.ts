import { IActionDispatcher, IActionDomain, IActionTracker, IEvent, IRunnableAction } from '../../sdk';
import { Action } from '../rasa-action/rasa-action.decorators';

@Action({ name: 'hello_action' })
export class HelloAction implements IRunnableAction {
  async run(tracker: IActionTracker, dispatcher: IActionDispatcher, domain: IActionDomain): Promise<IEvent<any>[] | void> {
    console.log(tracker, dispatcher, domain);
    return;
  }
}
