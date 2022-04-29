/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import * as yargs from 'yargs';
const fs = require('fs');

import {ChalkColor} from './utilities';
import {addUserDirectoryInterface} from './interfaces';

/**
 * Class to Add Users to the Directory
 */
export class AddUserDirectory extends ChalkColor implements addUserDirectoryInterface {
  constructor() {
    super();
  }

  /**
   * This function adds a new directory to any user found on a json file
   */
  addUserDirectory() {
    yargs.command({
      command: 'addUser',
      describe: 'Adds a user to the system',
      builder: {
        user: {
          describe: 'User name',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const color = new ChalkColor();
        let createDir: boolean = false;
        try {
          fs.readFileSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Pablo400/src/ejercicio-3/users.json`);
          const json = require(`/home/usuario/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Pablo400/ProgramFiles/users.json`);
          // Comprobar si existe el usuario mirando en el fichero users.json que es una pequeña base de datos con los usuarios del sistema
          // y creamos su fichero correspondiente
          for (const user of json) {
            if (argv.user === user.username) {
              createDir = true;
              break;
            }
          }
          if (createDir === true) {
            fs.mkdirSync(`/home/usuario/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Pablo400/ProgramFiles/${argv.user}`);
            return console.log(color.getColor('green', 'Directorio del usuario creado'));
          } else {
            return console.log(color.getColor('red', 'No se pudo crear el directorio'));
          }
        } catch (err) {
          return console.log(color.getColor('red', 'Ese usuario ya está incluido'));
        }
      },
    });
  }
};
