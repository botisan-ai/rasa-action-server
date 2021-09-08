import { Injectable, applyDecorators } from '@nestjs/common';
import { IActionOptions, Action as SDKAction } from '@xanthous/rasa-sdk';

export function Action(options: IActionOptions) {
  return applyDecorators(Injectable(), SDKAction(options));
}
