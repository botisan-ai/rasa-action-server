import { MetadataStorage } from './metadata';
import { ActionTracker } from './tracker';
import { ActionDispatcher } from './dispatcher';
import { ActionDomain } from './domain';
import { IAction } from './action';

/**
 * Manages lifecycle of an action request.
 *
 * Stages:
 * - Receive Request
 * - Execute Action
 * - Collect Action Response
 * - Send Response
 */
export class Lifecycle {
  public async execute(req: { body: IAction }, res: any): Promise<void> {
    const { next_action, tracker, domain } = req.body;
    const actionMetadata = MetadataStorage.getMetadataByName(next_action);
    const action = new actionMetadata.target();

    const _tracker = new ActionTracker(tracker);
    const _dispatcher = new ActionDispatcher();
    const _domain = new ActionDomain(domain);

    // Execute side effects.
    await action.run(_tracker, _dispatcher, _domain);

    res.json(_dispatcher.messages);
  }
}
