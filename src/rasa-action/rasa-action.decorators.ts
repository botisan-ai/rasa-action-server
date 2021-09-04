import { Injectable, applyDecorators } from '@nestjs/common';
import { IActionOptions, Action as SDKAction } from '../../sdk';

export function Action(options: IActionOptions) {
  return applyDecorators(SDKAction(options), Injectable());
}
