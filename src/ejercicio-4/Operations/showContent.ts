/* eslint-disable require-jsdoc */
import yargs from 'yargs';
import {access, constants, readFile} from 'fs';

export class ShowContent {
  constructor() {}

  pathContent() {
    yargs.command({
      command: 'cat',
      describe: 'Show files content',
      builder: {
        path: {
          describe: 'Path',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const show = new ShowContent();
        show.pathContentFunction(`${argv.path}`);
      },
    });
  }

  private pathContentFunction(path: string) {
    access(`${path}`, constants.F_OK, (err) => {
      if (err) {
        console.log(err);
      }
      readFile(`${path}`, function(err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data.toString());
      });
    });
  }
}
