import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import { getUnhandledProps } from '../lib';

class MinutePickerCell extends Component {
  _onMinuteClick = event => {
    event.stopPropagation();
    const { onClick, minute } = this.props;
    onClick(event, { ...this.props, value: minute });
  };
  render() {
    const { hour, minute } = this.props;
    const rest = getUnhandledProps(MinutePickerCell, this.props);
    return (
      <Table.Cell
        {...rest}
        onClick={this._onMinuteClick}
        className="suir-calendar time"
        textAlign="center"
      >
        {hour + ':' + minute}
      </Table.Cell>
    );
  }
}

MinutePickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: PropTypes.func.isRequired,
  hour: PropTypes.string.isRequired,
  minute: PropTypes.string.isRequired,
};

export default MinutePickerCell;
