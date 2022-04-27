/* eslint-disable require-jsdoc */
import yargs from 'yargs';
import {rmdir, lstat, unlink} from 'fs';

/**
 * Class delete
*/
export class Delete {
  /**
   * Delete constructor
  */
  constructor() {}

  /**
   * Deletes a path
  */
  deleteDirFile() {
    yargs.command({
      command: 'delete',
      describe: 'Delete files or Dir',
      builder: {
        path: {
          describe: 'Path',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        lstat(`${argv.path}`, (err, stats) => {
          if (err) {
            return console.log(err);
          }
          if (stats.isDirectory()) {
            rmdir(`${argv.path}`, (err) => {
              if (err) {
                console.log(err);
              }
              console.log('Carpeta eliminada');
            });
          } else if (stats.isFile()) {
            unlink(`${argv.path}`, (err) => {
              if (err) {
                console.log(err);
              }
              console.log('Fichero eliminado');
            });
          }
        });
      },
    });
  }
}
