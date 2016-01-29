import React, { PropTypes } from 'react';

const CounterButton = ({onChangeClick, displayText}) => (
  <button
    type='button'
    onClick={onChangeClick}
  >
    {displayText}
  </button>
);
CounterButton.propTypes = {
  displayText: PropTypes.string.isRequired,
  onChangeClick: PropTypes.func.isRequired
}

export default CounterButton;
