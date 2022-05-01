/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
import yargs from 'yargs';
import {mkdir} from 'fs';

/**
 * Create directory class
 */
export class CreateDir {
  /**
   * Create Dir constructor
   */
  constructor() {}

  /**
   * Yargs Command
  */
  newDir() {
    yargs.command({
      command: 'newDir',
      describe: 'Creates a new Dir',
      builder: {
        dirName: {
          describe: 'Directory name',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const newDir = new CreateDir();
        newDir.newDirFunction(`${argv.dirName}`);
      },
    });
  }

  /**
   * Creates a new directory
   * @param dirName Name of any directory
   */
  private newDirFunction(dirName: string) {
    mkdir(`${dirName}`, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directorio creado de forma satisfactoria');
    });
  }
}
