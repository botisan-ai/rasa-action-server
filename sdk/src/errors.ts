export class ActionAlreadyExistError extends Error {
  constructor(name: string) {
    super(`Action with name: ${name} already exists.`);
  }
}

export class ActionNotFoundError extends Error {
  constructor(name: string) {
    super(`Action with name: ${name} is not found.`);
  }
}

/**
 * Action is not valid for further processing.
 */
export class ActionRejectedError extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
