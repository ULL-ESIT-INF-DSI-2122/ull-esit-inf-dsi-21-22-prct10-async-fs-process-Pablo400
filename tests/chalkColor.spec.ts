/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';
import * as chalk from 'chalk';

import {ChalkColor} from '../src/ejercicio-3/NoteOperations/utilities';

const color = new ChalkColor();

describe('Test Chalk Color', () => {
  it('color.getColor(red, Hola) return chalk.red(Hola)', () => {
    expect(color.getColor('red', 'Hola')).to.be.equal(chalk.default.red('Hola'));
  });
  it('color.getColor(green, Hola) return chalk.green(Hola)', () => {
    expect(color.getColor('green', 'Hola')).to.be.equal(chalk.default.green('Hola'));
  });
  it('color.getColor(yellow, Hola) return chalk.yellow(Hola)', () => {
    expect(color.getColor('yellow', 'Hola')).to.be.equal(chalk.default.yellow('Hola'));
  });
  it('color.getColor(blue, Hola) return chalk.blue(Hola)', () => {
    expect(color.getColor('blue', 'Hola')).to.be.equal(chalk.default.blue('Hola'));
  });
  it('color.getColor(grey, Hola) return chalk.blue(Hola)', () => {
    expect(color.getColor('grey', 'Hola')).to.be.equal(undefined);
  });
});


