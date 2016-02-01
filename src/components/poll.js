import React, {Component} from 'react';
import {Bar} from 'react-chartjs';

import formatUrl from '../utils/format-url'

export default class Poll extends Component {
  constructor() {
    super()
    this.state = {value: ''}
  }
  render() {
    let {polls, params, postVoteOnPoll} = this.props;
    let pollName = formatUrl(params.poll, false)
      , poll = polls.find(x => x.name === pollName)
      , options = Object.keys(poll.options)
      , data = {
          labels: options,
          datasets: [{
            label: 'Bar chart',
            fillColor: 'rgba(63,81,181,0.5)',
            strokeColor: 'rgba(63,81,181,0.8)',
            highlightFill: 'rgba(63,81,181,0.75)',
            highlightStroke: 'rgba(63,81,181,1)',
            data: options.map(x => poll.options[x])
          }]
        }
    return (
      <div className='container'>
        <div className='row center'>
          <div className='col s12'>
            <h2>{pollName}</h2>
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s12 m5 offset-m3'>
            <select className='browser-default'
              onChange={(e) => this.setState({value: e.target.value})}
              defaultValue='select'
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
                postVoteOnPoll('hello', poll.id, this.state.value
              )}}
              type='submit' className='btn'
              disabled={!this.state.value}>Submit</button>
          </div>
        </div>
        <div className='row center'>
          <div className='col s12'>
            <Bar data={data} width={400} height={250}/>
          </div>
        </div>
      </div>
    )
  }
};
