import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import map from 'lodash/map';
import chunk from 'lodash/chunk';

import { getUnhandledProps, getMonths } from '../../lib';
import MonthPickerCell from '../cells/MonthPickerCell';
import PopupFooter from '../PopupFooter/PopupFooter.component';

class MonthPickerPopup extends Component {
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
    const { closePopup, switchMode, inputType } = this.props;
    const rest = getUnhandledProps(MonthPickerPopup, this.props);
    return (
      <>
        <Table.Body {...rest}>{this._getRows()}</Table.Body>
        <PopupFooter
          inputType={inputType}
          switchMode={switchMode}
          closePopup={closePopup}
          pickerName="Month"
        />
      </>
    );
  }
}

MonthPickerPopup.propTypes = {
  /** (event, data) => {} */
  onMonthClick: PropTypes.func.isRequired,
  activeMonth: PropTypes.string,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
  inputType: PropTypes.string,
};

export default MonthPickerPopup;
