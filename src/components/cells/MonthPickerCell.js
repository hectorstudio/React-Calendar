import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import { getUnhandledProps } from '../../lib';

class MonthPickerCell extends Component {
  _onMonthClick = event => {
    const { onClick, month } = this.props;
    event.stopPropagation();
    onClick(event, { ...this.props, value: month });
  };
  render() {
    const { month } = this.props;
    const rest = getUnhandledProps(MonthPickerCell, this.props);
    return (
      <Table.Cell
        {...rest}
        onClick={this._onMonthClick}
        className="suir-calendar date"
        textAlign="center"
      >
        {month}
      </Table.Cell>
    );
  }
}

MonthPickerCell.propTypes = {
  /** (event, data) => {} */
  onClick: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
};

export default MonthPickerCell;
