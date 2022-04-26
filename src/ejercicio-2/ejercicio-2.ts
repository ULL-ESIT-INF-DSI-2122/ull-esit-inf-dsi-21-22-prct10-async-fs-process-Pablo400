/* eslint-disable no-trailing-spaces */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {ChildProcess} from './catGrep';
import * as yargs from 'yargs';

const showFile = new ChildProcess();

showFile.withPipe();
showFile.withoutPipes();

yargs.parse();


