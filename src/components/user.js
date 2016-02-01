import React from 'react';

export default ({
  users,
  params
}) => (
  <div className='container'>
    <div className='row'>
      <div className='col s12 m8 offset-m2 center'>
        <h1>{params.user}</h1>
      </div>
    </div>
  </div>
)
