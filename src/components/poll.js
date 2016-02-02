import React from 'react';
import {Link} from 'react-router';
import {Bar} from 'react-chartjs';

import formatUrl from '../utils/format-url'

export default ({
  polls,
  params,
  authedUser,
  postVoteOnPoll,
  changeSelectedOption,
}) => {
  let pollName = formatUrl(params.poll, false)
    , poll = polls.find(x => x.name === pollName)
    , options, data;

  if (poll) {
    options = Object.keys(poll.options);
    data = {
      labels: options,
      datasets: [{
        label: 'Bar chart',
        fillColor: 'rgba(63,81,181,0.5)',
        strokeColor: 'rgba(63,81,181,0.8)',
        highlightFill: 'rgba(63,81,181,0.75)',
        highlightStroke: 'rgba(63,81,181,1)',
        data: options.map(x => poll.options[x])
      }]
    };
    return <div className='container'>
      <div className='row center'>
        <div className='col s12'>
          <h2>{pollName}</h2>
          <h5>Submitted by: {' '}
            <Link to={`/users/${poll.submitter}`}>{poll.submitter}</Link>
          </h5>
        </div>
      </div>
      <div className='row'>
        <div className='input-field col s12 m5 offset-m3'>
          <select className='browser-default'
            onChange={(e) => changeSelectedOption(poll.id, e.target.value)}
            defaultValue={poll.selectedOption}
          >
            <option value='select' disabled>Select an option</option>
            {options.map((x, i) => (
              <option key={i} value={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className='input-field col s12 m2 center'>
          <button
            onClick={(e) => {
              e.preventDefault();
              postVoteOnPoll(authedUser, poll.id, poll.selectedOption)}}
            type='submit' className='btn'
            disabled={poll.selectedOption === 'select'}>Submit</button>
        </div>
      </div>
      <div className='row center'>
        <div className='col s12'>
          <Bar data={data} width={400} height={250}/>
        </div>
      </div>
    </div>
  } else {
    return <div className='container'>
      <div className='row center'>
        <div classNAme='col s12'>
          <h4>Unable to find the poll:</h4>
          <h5>{pollName}</h5>
        </div>
      </div>
    </div>
  }
}
