/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {readNoteInterface} from './interfaces';

/**
 * Class to Read Notes
 */
export class ReadNotes extends ChalkColor implements readNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function reads a note
   */
  readNote() {
    yargs.command({
      command: 'read',
      describe: 'Read a note',
      builder: {
        user: {
          describe: 'User name',
          demandOption: true,
          type: 'string',
        },
        title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const color = new ChalkColor();
        if (fs.existsSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`)) {
          try {
            fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
            const json: any = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
            console.log(color.getColor(json.color, json.title));
            console.log(color.getColor(json.color, json.body));
          } catch (err) {
            return console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
          }
        } else {
          return console.log(color.getColor('red', 'Esa nota no existe'));
        }
      },
    });
  }
};
