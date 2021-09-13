import { ActionAlreadyExistError, ActionNotFoundError } from './errors';
import { IRunnableAction } from './action';
import { IConstructor } from './class';

export interface IActionMetadata {
  name: string;
  target: IConstructor<IRunnableAction>;
}

class MetadataStorage_ {
  private readonly _actions = new Map<string, IActionMetadata>();

  public addActionMetadata(meta: IActionMetadata) {
    if (this._actions.has(meta.name)) {
      throw new ActionAlreadyExistError(meta.name);
    }

    this._actions.set(meta.name, meta);
  }

  public getMetadataByName(name: string): IActionMetadata {
    if (!this._actions.has(name)) {
      throw new ActionNotFoundError(name);
    }

    return this._actions.get(name);
  }

  public getMetadataByDecorator(decorator: IConstructor<IRunnableAction>): IActionMetadata {
    for (const meta of this._actions.values()) {
      if (meta.target === decorator) {
        return meta;
      }
    }

    throw new ActionNotFoundError(decorator.name);
  }
}

export const MetadataStorage = new MetadataStorage_();
