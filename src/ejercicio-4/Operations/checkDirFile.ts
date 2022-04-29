/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
import * as yargs from 'yargs';
import {lstat} from 'fs';

/**
 * Class checker of files
*/
export class Check {
  /**
   * Check constructor
  */
  constructor() {}

  /**
   * Checks if a path is a directory or a file
  */
  dirOrFile() {
    yargs.command({
      command: 'check',
      describe: 'Show if its a dir or a file',
      builder: {
        path: {
          describe: 'Path',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const prueba = new Check();
        prueba.checkFunction(`${argv.path}`);
      },
    });
  }

  private checkFunction(path: string) {
    lstat(`${path}`, (err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (stats.isFile()) {
        console.log(`Es un fichero`);
      } else if (stats.isDirectory()) {
        console.log(`Es un directorio`);
      }
    });
  }
}
