import { expect } from 'chai';
import React from 'react';
import sd from 'skin-deep';

import { App } from '../../src/containers/app';

describe('App Container (without store)', () => {
  let tree;

  beforeEach(() => {
    tree = sd.shallowRender(<App counter='0' dispatch={() => {}} />);
  });

  it('Should render the app body with header, paragraphs, counter and buttons', () => {
    expect(tree.subTree('h1').text()).to.equal('Hello World!');
    expect(tree.everySubTree('p')[0].text()).to.equal('React Starter Project');
    expect(tree.everySubTree('p')[2].text()).to.equal('0');
  });
});
