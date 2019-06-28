import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

import { getUnhandledProps } from '../../lib';
import MinutePickerCell from '../cells/MinutePickerCell';
import PopupFooter from '../PopupFooter/PopupFooter.component';

const MINUTES = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

class MinutePickerPopup extends Component {
  _getRows = minutes => {
    const rows = [];
    let rowIndex = 0;
    forEach(minutes, (min, i) => {
      if (i % 3 === 0 && i !== 0) {
        rowIndex += 1;
      }
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(min);
    });

    return rows;
  };
  _onButtonClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const { switchMode } = this.props;
    setTimeout(() => {
      switchMode('day');
    }, 0);
  };
  _onMinutePickerClicked = (event, data) => {
    const { onMinuteClick, inputType, closePopup } = this.props;
    onMinuteClick(event, data);
    if (inputType === 'dateTime') closePopup();
  };
  render() {
    const {
      hour,
      activeMinute,
      closePopup,
      switchMode,
      inputType,
    } = this.props;
    const rest = getUnhandledProps(MinutePickerPopup, this.props);
    const cellStyle = {
      width: '33.33333%',
      minWidth: '8em',
    };
    const minutes = map(MINUTES, minute => (
      <MinutePickerCell
        style={cellStyle}
        onClick={this._onMinutePickerClicked}
        active={minute === activeMinute}
        hour={hour}
        minute={minute}
        key={minute}
      />
    ));
    const rows = map(this._getRows(minutes), (row, i) => (
      <Table.Row key={i}>{row}</Table.Row>
    ));

    return (
      <>
        <Table.Body {...rest}>{rows}</Table.Body>
        <PopupFooter
          inputType={inputType}
          switchMode={switchMode}
          closePopup={closePopup}
          pickerName="Minute"
        />
      </>
    );
  }
}

MinutePickerPopup.propTypes = {
  /** (event, data) => {} */
  onMinuteClick: PropTypes.func.isRequired,
  /** 'hh' */
  hour: PropTypes.string.isRequired,
  activeMinute: PropTypes.string,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
  inputType: PropTypes.string,
};

export default MinutePickerPopup;
