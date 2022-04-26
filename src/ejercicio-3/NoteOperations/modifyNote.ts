/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {modifyNoteInterface} from './interfaces';

/**
 * Class to Modify Notes
 */
export class ModifyNote extends ChalkColor implements modifyNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function modifies an existing note
   */
  modifyNote() {
    yargs.command({
      command: 'modify',
      describe: 'Modify an existing Note',
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
        body: {
          describe: 'Note',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const color = new ChalkColor();
        if (fs.existsSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`)) {
          try {
            fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
            // Paso el contenido del fichero en formato JSON a una variable y le cambio el valor del cuerpo
            // y se crea el mismo fichero con el nuevo body pasado
            const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`);
            json.body = argv.body;
            try {
              fs.writeFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`, JSON.stringify(json, null, 2));
              return console.log(color.getColor('green', 'La nota se ha modificado de forma satisfactoria'));
            } catch (err) {
              return console.log(color.getColor('red', 'No se ha podido crear la nota'));
            }
          } catch (err) {
            return console.log(color.getColor('red', 'Esa nota no existe'));
          }
        } else {
          console.log(color.getColor('red', 'Ha ocurrido un error inesperado'));
        }
      },
    });
  }
};
