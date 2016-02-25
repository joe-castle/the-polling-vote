'use strict';

import React from 'react';
import {expect} from 'chai';
import sd from 'skin-deep';

global.window = {};
global.window.document = {};
global.window.document.createElement = {};

import Footer from '../../src/components/footer';
import NavBar from '../../src/components/navbar';
import Pagination from '../../src/components/pagination';
// import Poll from '../../src/components/poll';
import Preloader from '../../src/components/preloader';
// import User from '../../src/components/user';

// import {App} from '../../src/containers/app';
// import {Login} from '../../src/containers/login';
import {Polls} from '../../src/containers/polls';
// import {Signup} from '../../src/containers/Signup';
import {Users} from '../../src/containers/users';

describe('React components', () => {
  describe('Footer', () => {
    let tree;
    beforeEach(() => {
      tree = sd.shallowRender(<Footer baseColor='indigo'/>);
    });
    it('Renders the footer', () => {
      let mainContentDiv = tree.subTree('.s12').subTree;
      let secondaryContentDiv = tree.subTree('.footer-copyright');

      expect(tree.props.className).to.contain('indigo');

      expect(mainContentDiv('h5').text()).to.equal('Project Idea');
      expect(mainContentDiv('p').text()).to.equal('This project was built as part of the freeCodeCamp.com curriculum.');
      expect(mainContentDiv('a').text()).to.equal('Learn More');

      expect(secondaryContentDiv.text()).to.contain('© 2016 Joe Smith');
      expect(secondaryContentDiv.subTree('a').text()).to.equal('MIT License');
    });
  });
  describe('Navbar', () => {
    it('Renders the navbar');
  });
  describe('Pagination', () => {
    it('Renders pagination with 1 page of results', () => {
      let tree = sd.shallowRender(
        <Pagination
          totalNodes={1}
        />
      );
      let liElements = tree.everySubTree('li');

      expect(liElements).to.have.lengthOf(3);
      expect(liElements[0].text()).to.equal('chevron_left');
      expect(liElements[2].text()).to.equal('chevron_right');
    });
    it('Renders pagination with 2 pages of results', () => {
      let tree = sd.shallowRender(
        <Pagination
          totalNodes={6}
        />
      );
      let liElements = tree.everySubTree('li');
      expect(liElements).to.have.lengthOf(4);
      expect(liElements[0].text()).to.equal('chevron_left');
      expect(liElements[3].text()).to.equal('chevron_right');
    });
    it('Renders pagination with 2 pages of results and second page selected', () => {
      let tree = sd.shallowRender(
        <Pagination
          pageNumber={2}
          totalNodes={6}
        />
      );
      let liElements = tree.everySubTree('li');

      expect(liElements).to.have.lengthOf(4);
      expect(liElements[0].text()).to.equal('chevron_left');
      expect(liElements[3].text()).to.equal('chevron_right');

      expect(liElements[2].props.className).to.contain('active');
    });
  });
  describe('Poll', () => {
    it('Renders a poll');
  });
  describe('Preloader', () => {
    it('Renders the preloader', () => {
      let tree = sd.shallowRender(<Preloader/>);

      expect(tree.everySubTree('.circle')).to.have.lengthOf(3);
      expect(tree.everySubTree('.circle-clipper')).to.have.lengthOf(2);
      expect(tree.subTree('.preloader-wrapper')).to.not.be.false;
      expect(tree.subTree('.spinner-layer')).to.not.be.false;
      expect(tree.subTree('.gap-patch')).to.not.be.false;
      expect(tree.subTree('.loader-bg')).to.not.be.false;
    });
  });
  describe('App', () => {
    it('Renders a app');
  });
  describe('User', () => {
    it('Renders a user');
  });
  describe('Login', () => {
    it('Renders the login');
  });
  describe('Polls', () => {
    it('Renders "No active polls found." when no active polls exist', () => {
      let tree = sd.shallowRender(<Polls polls={[]}/>);

      expect(tree.subTree('h1').text()).to.equal('No active polls found.')
    });
    it('Renders a list of all the polls', () => {
      let tree = sd.shallowRender(
        <Polls
          polls={[{name: 'A New Poll'}]}
          pagedPolls={[{name: 'A New Poll'}]}
        />
      );
      expect(tree.subTree('h1').text()).to.equal('Active Polls')
      expect(tree.subTree('Link').props.children).to.equal('A New Poll')
      expect(tree.subTree('Link').props.to).to.equal('/polls/A_New_Poll')
    });
  });
  describe('Signup', () => {
    it('Renders the signup');
  });
  describe('Users', () => {
    it('Renders "No active polls found." when no active polls exist', () => {
      let tree = sd.shallowRender(<Users users={[]}/>);

      expect(tree.subTree('h1').text()).to.equal('No active users found.')
    });
    it('Renders a list of all the polls', () => {
      let tree = sd.shallowRender(
        <Polls
          polls={[{name: 'A New Poll'}]}
          pagedPolls={[{name: 'A New Poll'}]}
        />
      );
      expect(tree.subTree('h1').text()).to.equal('Active Polls')
      expect(tree.subTree('Link').props.children).to.equal('A New Poll')
      expect(tree.subTree('Link').props.to).to.equal('/polls/A_New_Poll')
    });
  });
});
