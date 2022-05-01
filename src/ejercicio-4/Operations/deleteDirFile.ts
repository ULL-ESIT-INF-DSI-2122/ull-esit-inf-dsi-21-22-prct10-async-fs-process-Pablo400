/* eslint-disable valid-jsdoc */
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
   * Yargs Command
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
        const deleted = new Delete();
        deleted.deleteFunction(`${argv.path}`);
      },
    });
  }

  /**
   * Deletes a path
   * @param path Any path
   */
  private deleteFunction(path: string) {
    lstat(`${path}`, (err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (stats.isDirectory()) {
        rmdir(`${path}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log('Carpeta eliminada');
        });
      } else if (stats.isFile()) {
        unlink(`${path}`, (err) => {
          if (err) {
            console.log(err);
          }
          console.log('Fichero eliminado');
        });
      }
    });
  }
}
