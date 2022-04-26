/* eslint-disable no-trailing-spaces */
import {spawn} from 'child_process';
import * as yargs from 'yargs';

/**
 * Class that constains both child Process
 */
export class ChildProcess {
  /**
   * Class constructor
   */
  constructor() {}

  /**
   * The child Process with pipes
   */
  withPipe() {
    yargs.command({
      command: 'pipe',
      describe: 'Bash command',
      builder: {
        filename: {
          describe: 'File name',
          demandOption: true,
          type: 'string',
        },
        pattern: {
          describe: 'Pattern',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const cat = spawn('cat', [`${argv.filename}`]);
        const grep = spawn('grep', [`${argv.pattern}`]);

        cat.stderr.on('data', (err) => {
          console.error(err.toString());
        });

        cat.stdout.pipe(grep.stdin);

        let wcOutput = '';
        grep.stdout.on('data', (piece) => {
          wcOutput += piece;
        });

        grep.stderr.on('data', (err) => {
          console.error(err.toString());
        });

        grep.on('close', () => {
          process.stdout.write(wcOutput);
        });
      },
    });
  }

  /**
   * The child Process without pipes
   */
  withoutPipes() {
    yargs.command({
      command: 'nopipe',
      describe: 'Bash command',
      builder: {
        filename: {
          describe: 'File name',
          demandOption: true,
          type: 'string',
        },
        pattern: {
          describe: 'Pattern',
          demandOption: true,
          type: 'string',
        },
      },
      handler(argv) {
        const cat = spawn('cat', [`${argv.filename}`]);
        const grep = spawn('grep', [`${argv.pattern}`]);

        cat.stdout.on('data', (catResult) => {
          grep.stdin.write(catResult);
        });
    
        grep.stdout.on('data', (grepResult) => {
          console.log(grepResult.toString());
        });
    
        cat.stderr.on('data', (err) => {
          console.error(err.toString());
        });
    
        grep.stderr.on('data', (err) => {
          console.error(err.toString());
        });
    
        cat.on('close', (code) => {
          if (code !== 0) {
            console.log(`cat process exited with code ${code}`);
          }
          grep.stdin.end();
        });
    
        grep.on('close', (code) => {
          if (code !== 0) {
            console.log(`grep process exited with code ${code}`);
          }
        });
      },
    });
  }
}
