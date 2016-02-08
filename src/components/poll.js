import React from 'react';
import {Link} from 'react-router';
import {Bar} from 'react-chartjs';

import formatUrl from '../utils/format-url'
import {postVoteOnPoll, changeSelectedOption} from '../actions/poll-actions';

export default ({
  polls,
  params,
  dispatch
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
          <a
            href={`https://twitter.com/intent/tweet?text=${poll.name} - Poll @ The Polling Vote - ${window.location.origin}/polls/${formatUrl(poll.name, true)}`}
            target='_blank'
            className='btn blue'>Share on Twitter</a>
        </div>
      </div>
      <div className='row'>
        <div className='input-field col s12 m5 offset-m3'>
          <select className='browser-default'
            onChange={(e) => dispatch(changeSelectedOption(poll.name, e.target.value))}
            defaultValue={poll.selectedOption}
          >
            <option value='select' disabled>Select an option to vote</option>
            {options.map((x, i) => (
              <option key={i} value={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className='input-field col s12 m2 center'>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(postVoteOnPoll(poll.name, poll.selectedOption))}}
            type='submit' className='btn'
            disabled={poll.selectedOption === 'select'}>Submit</button>
        </div>
      </div>
      <div className='row center'>
        <div className='col s12'>
          <Bar
            data={data}
            width={(function(){if(window.innerWidth < 600) {
              return window.innerWidth*0.85
            } else {
              return window.innerWidth*0.70
            }}())}
            height={400}/>
        </div>
      </div>
    </div>
  } else {
    return <div className='container'>
      <div className='row center'>
        <div className='col s12'>
          <h4>Unable to find the poll:</h4>
          <h5>{pollName}</h5>
        </div>
      </div>
    </div>
  }
}
