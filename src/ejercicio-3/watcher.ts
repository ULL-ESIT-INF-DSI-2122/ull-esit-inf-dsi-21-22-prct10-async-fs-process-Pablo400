/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {spawn} from 'child_process';
const hound = require('hound');

export class Watcher {
  constructor() {}

  // watchDir(path: string) {
  //   watch(`${path}`, (eventType) => {
  //     if (eventType === 'change') {
  //       console.log(`El fichero ${path} ha sido modificado`);
  //     } else if (eventType === 'rename') {
  //       console.log(`El fichero ${path} ha sido eliminado o creado`);
  //     }
  //   });
  // }

  /**
   * Watch a directory for changes
   * @param path Path of the directory or file
   */
  watchDirHound(path: string) {
    const watcher = hound.watch(`${path}`);

    watcher.on('create', (file: any) => {
      console.log(file + ' was created');
      this.catFile(file);
    });
    watcher.on('change', (file: any ) => {
      console.log(file + ' was changed');
      this.catFile(file);
    });
  }

  /**
   * Shows the content of a file
   * @param file Any file changed or created
   */
  catFile(file: string) {
    const cat = spawn('cat', [`${file}`]);

    cat.stderr.on('data', (err) => {
      console.error(err.toString());
    });

    let catOutput = '';
    cat.stdout.on('data', (piece) => {
      catOutput += piece;
    });

    cat.stdout.on('close', () => {
      console.log(catOutput);
    });
  }
}
