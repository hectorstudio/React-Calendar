import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import { getUnhandledProps } from '../../lib';

class HourPickerCell extends Component {
  _onHourClick = event => {
    event.stopPropagation();
    const { onClick, hour } = this.props;
    onClick(event, { ...this.props, value: hour });
  };
  render() {
    const { hour } = this.props;
    const rest = getUnhandledProps(HourPickerCell, this.props);
    return (
      <Table.Cell
        {...rest}
        onClick={this._onHourClick}
        className="suir-calendar time"
        textAlign="center"
      >
        {hour + ':00'}
      </Table.Cell>
    );
  }
}
HourPickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: PropTypes.func.isRequired,
  hour: PropTypes.string.isRequired,
};

export default HourPickerCell;
