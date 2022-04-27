/* eslint-disable require-jsdoc */
import yargs from 'yargs';
import {spawn} from 'child_process';
import {lstat} from 'fs';

/**
 * Class delete
*/
export class ListFiles {
  /**
   * ListFiles constructor
  */
  constructor() {}

  /**
   * List all files in a directory
   */
  listFiles() {
    yargs.command({
      command: 'list',
      describe: 'Lists all files',
      builder: {
        dirName: {
          describe: 'Directory name',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        lstat(`${argv.dirName}`, (err, stats) => {
          if (err) {
            return console.log(err);
          }

          if (stats.isDirectory()) {
            const ls = spawn('ls', ['-lAh', `${argv.dirName}`]);
            const grep = spawn('grep', ['^d', '-v']);

            ls.on('error', (err) => {
              console.log(err);
            });

            ls.stdout.pipe(grep.stdin);

            let wcOutput = '';
            grep.stdout.on('data', (data) => {
              wcOutput += data.toString();
            });

            grep.on('close', () => {
              process.stdout.write(wcOutput);
            });

            grep.on('error', (err) => {
              console.log(err);
            });
          } else if (stats.isFile()) {
            console.log('Porfavor introduzca un directorio');
          }
        });
      },
    });
  }
}
