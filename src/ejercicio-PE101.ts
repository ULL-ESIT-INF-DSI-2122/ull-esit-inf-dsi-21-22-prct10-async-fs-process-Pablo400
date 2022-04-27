/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {access, constants, watch} from 'fs';
import {spawn} from 'child_process';

/**
 * Class that watches a files and does ls on that file
 */
class WatchFileLs {
  constructor(private command: string, private option1: string, private option2: string, private filename: string) {}

  /**
   * Main program
   */
  mainProgram() {
    access(this.filename, constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${this.filename} does not exist`);
      } else {
        console.log(`Se empieza a observar el fichero ${this.filename}`);

        this.watcher();

        console.log(`File ${filename} is no longer watched`);
      }
    });
  }

  /**
   * Watcher thar sees if the file is changed or deleted
   */
  private watcher() {
    watch(`${this.filename}`, (eventType) => {
      if (eventType === 'change') {
        console.log(`El fichero ${filename} ha sido modificado`);
        const ls = spawn(`${this.command}`, [`${this.option1}`, `${this.option2}`, `${this.filename}`]);

        let lsOutput = '';
        ls.stdout.on('data', (data) => {
          lsOutput = data.toString().split(' ');
          console.log(`Permissions => ${lsOutput[0]}`);
          console.log(`Lines number => ${lsOutput[1]}`);
          console.log(`User => ${lsOutput[2]}`);
          console.log(`Group => ${lsOutput[3]}`);
          console.log(`Size => ${lsOutput[4]}`);
          console.log(`Month => ${lsOutput[5]}`);
          console.log(`Date => ${lsOutput[6]}`);
          console.log(`Hour => ${lsOutput[7]}`);
          console.log(`Name => ${lsOutput[8]}`);
        });
      } else if (eventType === 'rename') {
        console.log(`El fichero ${filename} ha sido eliminado`);
      }
    });
  }
}

const command = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const filename = process.argv[5];

if (process.argv.length !== 6) {
  console.log('Please, specify a file');
} else {
  const prueba = new WatchFileLs(command, option1, option2, filename);

  prueba.mainProgram();
}
