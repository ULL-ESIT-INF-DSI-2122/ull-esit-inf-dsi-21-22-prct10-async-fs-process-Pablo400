/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {addNoteInterface} from './interfaces';

/**
 * Class to Add Notes
 */
export class AddNote extends ChalkColor implements addNoteInterface {
  constructor() {
    super();
  }

  /**
   * This function adds a note to any user directory
   */
  addNote() {
    yargs.command({
      command: 'add',
      describe: 'Add a new note',
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
        color: {
          describe: 'Note color',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const color = new ChalkColor();
        // Comrpueba si el directorio del usuario ya existe
        if (fs.existsSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}`)) {
          const json: any = {
            title: argv.title,
            body: argv.body,
            color: argv.color,
          };

          if (argv.title != '' && argv.color != '' && argv.body != '' ) {
            if (argv.color === 'red' || argv.color === 'green' || argv.color === 'yellow' || argv.color === 'blue') {
              // Se comprueba si la nota ya existe
              if (fs.existsSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`)) {
                console.log(color.getColor('red', 'Esa nota ya existe'));
              } else {
                try {
                  fs.appendFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-Pablo400/ProgramFiles/${argv.user}/${argv.title}.json`, JSON.stringify(json, null, 2));
                  return console.log(color.getColor('green', 'La nota se ha creado de forma satisfactoria'));
                } catch (err) {
                  return console.log(color.getColor('red', 'No se ha podido crear la nota'));
                }
              }
            } else {
              return console.log(color.getColor('red', 'No se puede crear una nota si no se le indican un color, use: red, green, yellow o blue como colores'));
            }
          } else {
            return console.log(color.getColor('red', 'No se puede crear una nota vacía'));
          }
        } else {
          return console.log(color.getColor('red', 'Ese usuario no existe'));
        }
      },
    });
  }
};
