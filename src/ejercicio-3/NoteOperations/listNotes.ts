/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {listNotesInterface} from './interfaces';

/**
 * Class to List Notes
 */
export class ListNotes extends ChalkColor implements listNotesInterface {
  constructor() {
    super();
  }

  /**
   * This function list all notes on any directory of a user
   */
  listNotes() {
    yargs.command({
      command: 'list',
      describe: 'List all notes',
      builder: {
        user: {
          describe: 'User name',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const color = new ChalkColor();
        if (fs.existsSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}`)) {
          const files = fs.readdirSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}`);
          if (files.length === 0) {
            return console.log(color.getColor('red', 'Ese usuario no tiene ninguna nota'));
          } else {
            files.forEach((file: string) => {
              try {
                fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${file}`);
                const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${file}`);
                console.log(color.getColor(json.color, json.title));
              } catch (err) {
                return console.log(color.getColor('red', 'Ese fichero no existe'));
              }
            });
          }
        } else {
          return console.log(color.getColor('red', 'Ese directorio no existe'));
        }
      },
    });
  }
};
