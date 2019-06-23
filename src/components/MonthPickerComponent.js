import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import map from 'lodash/map';
import chunk from 'lodash/chunk';

import { getUnhandledProps, getMonths } from '../lib';

import MonthPickerCell from './MonthPickerCell';

class MonthPickerComponent extends Component {
  _getRows = () => {
    const { onMonthClick, activeMonth } = this.props;

    const cellStyle = {
      width: '33.333333%',
      minWidth: '7em',
    };
    const months = map(getMonths(), month => (
      <MonthPickerCell
        style={cellStyle}
        onClick={onMonthClick}
        active={month === activeMonth.toString()}
        month={month}
        key={month}
      />
    ));
    const rows = map(chunk(months, 3), (row, i) => (
      <Table.Row key={i}>{row}</Table.Row>
    ));
    return rows;
  };
  render() {
    const rest = getUnhandledProps(MonthPickerComponent, this.props);
    return <Table.Body {...rest}>{this._getRows()}</Table.Body>;
  }
}

MonthPickerComponent.propTypes = {
  /** (event, data) => {} */
  onMonthClick: PropTypes.func.isRequired,
  activeMonth: PropTypes.string,
};

export default MonthPickerComponent;
