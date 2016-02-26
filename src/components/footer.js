import React from 'react';

export default ({baseColor}) => (
  <footer className={`page-footer ${baseColor}`}>
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
            className={`btn ${baseColor} lighten-3`}>Learn More</a>
        </div>
      </div>
    </div>
    <div className='footer-copyright'>
      <div className='container'>
        © 2016 Joe Smith
        <a
          target='_blank'
          href='https://github.com/joesmith100/the-polling-vote/blob/master/LICENSE' className='grey-text text-lighten-4 right'>MIT License</a>
      </div>
    </div>
  </footer>
)
