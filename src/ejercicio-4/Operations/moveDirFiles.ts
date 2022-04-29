/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import yargs from 'yargs';
import {spawn} from 'child_process';

/**
* Class move or copy
*/
export class MoveOrCopy {
  /**
   * MoveOrCopy constructor
   */
  constructor() {}

  /**
   * Moves or copies a file or directory
   */
  moveOrCopy() {
    yargs.command({
      command: 'mvcp',
      describe: 'Show files content',
      builder: {
        origin: {
          describe: 'Path',
          demandOption: true,
          type: 'string',
        },
        destiny: {
          describe: 'Path',
          demandOption: true,
          type: 'string',
        },
        flag: {
          describe: 'Flag',
          demandOption: true,
          type: 'boolean',
        },
      },
      handler(argv) {
        const cpmv = new MoveOrCopy();
        cpmv.moveCopyFunction(`${argv.origin}`, `${argv.destiny}`, argv.flag as boolean);
      },
    });
  }

  private moveCopyFunction(origin: string, destiny: string, flag: boolean) {
    if (flag === true) {
      const mv = spawn('mv', [`${origin}`, `${destiny}`]);

      mv.on('close', () => {
        console.log(`Directorio o fichero movido a ${destiny}`);
      });
    } else if (flag === false) {
      const cp = spawn('cp', [`${origin}`, `${destiny}`]);

      cp.on('close', () => {
        console.log(`Directorio o fichero copiado a ${destiny}`);
      });
    } else {
      console.log(`No está permitida esa opción`);
    }
  }
}
