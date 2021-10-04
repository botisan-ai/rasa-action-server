
/**
 * https://rasa.com/docs/action-server/sdk-dispatcher#parameters
 */
// prettier-ignore
export type UtterMessageType =
  | 'text'
  | 'image'
  | 'json_message'
  | 'response'
  | 'attachment'
  | 'buttons'
  | 'elements'
  | 'custom'
  | string;

export type UtterMessage = {
  [key in UtterMessageType]: any;
};
