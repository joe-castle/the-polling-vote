import { expect } from 'chai';

import * as types from '../../src/actions/action-types';
import * as actions from '../../src/actions/counter-actions'

describe('Counter Actions', () => {
  it('Creates an increment action', () => {
    const expectedAction = { type: types.INCREMENT_VALUE }

    expect(actions.incrementValue()).to.deep.equal(expectedAction);
  });
  it('Creates a decrement action', () => {
    const expectedAction = { type: types.DECREMENT_VALUE }

    expect(actions.decrementValue()).to.deep.equal(expectedAction);
  })
});
