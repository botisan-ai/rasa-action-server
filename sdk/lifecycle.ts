import { IAction, IRunnableAction } from './action';
import { ActionDispatcher } from './dispatcher';
import { ActionRejectedError } from './errors';
import { MetadataStorage } from './metadata';
import { ActionTracker } from './tracker';
import { ActionDomain } from './domain';
import { IConstructor } from './class';

/**
 * Manages lifecycle of an action request.
 *
 * Stages:
 * - Receive Request
 * - Execute Action
 * - Collect Action Responses
 * - Collect Action Events
 * - Send Response
 */
export class Lifecycle {
  private readonly actionFactory?: (target: IConstructor<IRunnableAction>) => IRunnableAction;

  constructor({ actionFactory }: ILifecycleOptions = {}) {
    this.actionFactory = actionFactory;
  }

  public async execute(req: { body: IAction }, res: any): Promise<void> {
    const { next_action, tracker, domain } = req.body;
    const actionMetadata = MetadataStorage.getMetadataByName(next_action);

    // prettier-ignore
    const action = this.actionFactory
      ? this.actionFactory(actionMetadata.target)
      : new actionMetadata.target();

    const _tracker = new ActionTracker(tracker);
    const _dispatcher = new ActionDispatcher();
    const _domain = new ActionDomain(domain);

    try {
      // Execute side effects.
      const events = (await action.run(_tracker, _dispatcher, _domain)) || [];
      const responses = _dispatcher.messages;
      res.status(200).json({
        responses,
        events: events.map((e) => ({ ...e.data, event: e.event })),
      });
      //
    } catch (e) {
      if (e instanceof ActionRejectedError) {
        return res.status(400).json({
          error: e.message,
          action_name: actionMetadata.name,
        });
      }

      return res.status(500).send(e);
    }
  }
}

export interface ILifecycleOptions {
  actionFactory?: (target: IConstructor<IRunnableAction>) => IRunnableAction;
}
