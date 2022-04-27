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
        if (argv.flag === true) {
          const mv = spawn('mv', [`${argv.origin}`, `${argv.destiny}`]);

          mv.on('close', () => {
            console.log(`Directorio o fichero movido a ${argv.destiny}`);
          });
        } else if (argv.flag === false) {
          const cp = spawn('cp', [`${argv.origin}`, `${argv.destiny}`]);

          cp.on('close', () => {
            console.log(`Directorio o fichero copiado a ${argv.destiny}`);
          });
        } else {
          console.log(`No está permitida esa opción`);
        }
      },
    });
  }
}
