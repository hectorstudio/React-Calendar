import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

import { dispatchDateChange } from '../lib/events';

class CustomInput extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) dispatchDateChange();
  }

  render() {
    return <Input {...this.props} />;
  }
}

CustomInput.propTypes = {
  value: PropTypes.any,
};

export default CustomInput;
