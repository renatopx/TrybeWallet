import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, testId, name, value, placeHolder, onchange } = this.props;
    return (
      <input
        type={ type }
        data-testid={ testId }
        name={ name }
        value={ value }
        placeholder={ placeHolder }
        onChange={ onchange }
        required
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  testId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeHolder: PropTypes.string,
}.isRequired;

export default Input;
