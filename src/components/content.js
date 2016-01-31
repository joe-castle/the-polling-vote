import React from 'react';

export default ({
  polls
}) => (
  <main>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2 center'>
          <h1>Active Polls</h1>
          <div className='divider'></div>
          <div className='collection'>
            {polls.map(x => (
              <a href='#' className='collection-item'>{x.name}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </main>
)
