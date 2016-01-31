import React from 'react';
import classNames from 'classNames';

export default ({baseColor}) => (
  <footer className={classNames('page-footer', baseColor)}>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m4'>
          <h5 className='grey-text text-lighten-4'>
            Project Idea
          </h5>
          <p className='grey-text text-lighten-4'>
            This project was built as part of the freeCodeCamp.com curriculum.
          </p>
          <a href='http://www.freecodecamp.com/challenges/build-a-voting-app'
            target='_blank'
            className={classNames('btn', baseColor, 'lighten-3')}>Learn More</a>
        </div>
      </div>
    </div>
    <div className='footer-copyright'>
      <div className='container'>
        © 2016 Joe Smith
        <a href='github' className='grey-text text-lighten-4 right'>MIT License</a>
      </div>
    </div>
  </footer>
)
