/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

import * as chalk from 'chalk';
import {chalkColorInterface} from './interfaces';

/**
 * Class that Changes fond letter
 */
export class ChalkColor implements chalkColorInterface {
  constructor() {}
  /**
   * Transforms a string into a colored string
   * @param color Color name
   * @param print Text to be printed in any color
   * @return Colored text or undefined
   */
  getColor(color: string, print: string): string | undefined {
    if (color === 'red') {
      return chalk.default.red(`${print}`);
    } else if (color === 'green') {
      return chalk.default.green(`${print}`);
    } else if (color === 'yellow') {
      return chalk.default.yellow(`${print}`);
    } else if (color === 'blue') {
      return chalk.default.blue(`${print}`);
    }

    return undefined;
  }
}
