/* eslint-disable valid-jsdoc */
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
   * Yargs Command
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
        const list = new ListFiles();
        list.listFunction(`${argv.dirName}`);
      },
    });
  }

  /**
   * List all files in a directory
   * @param dirName Name of any directory
   */
  private listFunction(dirName: string) {
    lstat(`${dirName}`, (err, stats) => {
      if (err) {
        return console.log(err);
      }

      if (stats.isDirectory()) {
        const ls = spawn('ls', ['-lAh', `${dirName}`]);
        const grep = spawn('grep', ['^d', '-v']);

        ls.on('error', (err) => {
          console.log(err);
        });

        ls.stdout.pipe(grep.stdin);

        let grepOutput = '';
        grep.stdout.on('data', (data) => {
          grepOutput += data.toString();
        });

        grep.on('close', () => {
          process.stdout.write(grepOutput);
        });

        grep.on('error', (err) => {
          console.log(err);
        });
      } else if (stats.isFile()) {
        console.log('Porfavor introduzca un directorio');
      }
    });
  }
}
