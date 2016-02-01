import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classNames';

import {history} from '../routes/react-routes';
import formatUrl from '../utils/format-url';

export default class User extends Component {
  static contextTypes = {
    history: PropTypes.object
  };
  constructor() {
    super();
    this.state = {
      pollName: '',
      options: [1, 2]
    }
  }
  handleOptionChange = (x, e) => {
    let o = this.state.options;
    if (o.length >= 2 && e.target.value && x === o.length) {
      this.setState({
        options: [
          ...o,
          o.length+1
        ]
      })
    }
    if (o.length > 2 && !e.target.value) {
      this.setState({
        options: o.slice(0, o.length-1)
      })
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let options = this.state.options.reduce((x, y) => {
      let field = this.refs[`option${y}`];
      if (field.value) {
        return {
          ...x,
          [field.value]: 0
        }
      }
      return x;
    }, {})
    let payload = {
      submitter: this.props.params.user,
      name: this.state.pollName,
      options
    }
    this.props.postAddPoll(this.props.params.user, payload);
    Materialize.toast(
      'Poll succesfully created! Redirecting in 2 seconds.',
      2000, '',
      function(name) {
        this.context.history.push(`/polls/${formatUrl(name, true)}`)
      }.bind(this, this.state.pollName)
    );
    this.setState({pollName: '', options: [1, 2]});
    this.state.options.forEach(x => {
      this.refs[`option${x}`].value = '';
    })
  };
  render() {
    let {users, polls, baseColor, postDeletePoll, params, authedUser} = this.props;
    return <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <div className='center'>
            <h1 className='center'>{params.user}</h1>
          </div>
          {authedUser === params.user && <form onSubmit={this.handleSubmit}>
            <h4>New Poll</h4>
            <div className='input-field'>
              <input
                onChange={(e) => this.setState({pollName: e.target.value})}
                value={this.state.pollName}
                ref='pollName'
                type='text'
                placeholder='Poll Name'
                className='validate'
                required
              />
            </div>
            <div className='input-field'>
              {this.state.options.map((x, i) => (
                <input
                  key={i}
                  onChange={this.handleOptionChange.bind(this, x)}
                  ref={`option${x}`}
                  type='text'
                  placeholder={`Option #${x}`}
                  className='validate'
                  required={i===0 || i===1}
                />
              ))}
            <button
              style={{marginBottom: '15px'}}
              className={classNames('btn', baseColor)}
              type='submit'
              >Submit</button>
            </div>
          </form>}
          <div className='divider'/>
          <ul className='collection with-header'>
            <li className='collection-header'><h4>Active Polls</h4></li>
            {users[params.user].ownPolls.map(x => {
              let poll = polls.find(y => y.id === x);
              return (
                <li key={x} className='collection-item'>
                  <div>
                    <Link
                      to={`/polls/${formatUrl(poll.name, true)}`}
                    >{poll.name}</Link>
                    {authedUser === params.user && <span><a
                      onClick={(e) => {
                        e.preventDefault();
                        postDeletePoll(params.user, x);
                      }}
                      className='secondary-content'
                    >
                      <i className='delete material-icons'>delete</i>
                    </a>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        postDeletePoll(params.user, x);
                      }}
                      className='secondary-content'
                    >
                      <i className='mode-edit material-icons'>mode_edit</i>
                    </a></span>}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  }
};
