import { expect } from 'chai';
import React from 'react';
import sd from 'skin-deep';

import CounterButton from '../../src/components/counter-button';

describe('CounterButton Component', () => {
  let tree;

  beforeEach(() => {
    tree = sd.shallowRender(<CounterButton displayText='+' onChangeClick={() => {}} />);
  });

  it('Should render a button with displayText(+/-)', () => {
    expect(tree.props.type).to.equal('button');
    expect(tree.props.children).to.equal('+');
    expect(tree.props.onClick).to.be.a('function');
  });
});
