import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

import { getUnhandledProps } from '../lib';

import MinutePickerCell from './MinutePickerCell';

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

class MinutePicker extends Component {
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
  render() {
    const {
      onMinuteClick,
      hour,
      activeMinute,
      shouldShowDayButton,
    } = this.props;
    const rest = getUnhandledProps(MinutePicker, this.props);
    const cellStyle = {
      width: '33.33333%',
      minWidth: '8em',
    };
    const minutes = map(MINUTES, minute => (
      <MinutePickerCell
        style={cellStyle}
        onClick={onMinuteClick}
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
      <Table.Body {...rest}>
        {rows}
        {shouldShowDayButton && (
          <Table.Row>
            <Table.Cell
              colSpan="7"
              style={{ cursor: 'pointer' }}
              onClick={this._onButtonClick}
              className="suir-calendar date"
            >
              <Icon name="calendar" />Day
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    );
  }
}

MinutePicker.propTypes = {
  /** (event, data) => {} */
  onMinuteClick: PropTypes.func.isRequired,
  /** 'hh' */
  hour: PropTypes.string.isRequired,
  activeMinute: PropTypes.string,
  shouldShowDayButton: PropTypes.bool,
  switchMode: PropTypes.func,
};

export default MinutePicker;
export { MinutePicker };
