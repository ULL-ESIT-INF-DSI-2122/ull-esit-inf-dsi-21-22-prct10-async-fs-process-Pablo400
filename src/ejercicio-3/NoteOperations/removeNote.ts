/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {removeNoteInterface} from './interfaces';

/**
 * Class to Remove Notes
 */
export class RemoveNote extends ChalkColor implements removeNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function removes a note
   */
  removeNote() {
    yargs.command({
      command: 'remove',
      describe: 'Remove a note',
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
        try {
          fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
          try {
            fs.unlinkSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
            return console.log(color.getColor('green', 'Nota eliminada'));
          } catch (err) {
            return console.log(color.getColor('red', 'La nota no pudo ser eliminada'));
          }
        } catch (err) {
          return console.log(color.getColor('red', 'Esa nota no existe'));
        }
      },
    });
  }
};
