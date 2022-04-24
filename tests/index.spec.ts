/* eslint-disable max-len */
import 'mocha';
import {expect} from 'chai';

import {add} from '../src/index';


describe('Test 1', () => {
  it('test1.map([])(2) return [3, 4, 5, 6, 7]', () => {
    expect(add(1, 2)).to.be.equal(3);
  });
});

