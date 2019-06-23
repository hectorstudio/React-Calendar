import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import map from 'lodash/map';
import forEach from 'lodash/forEach';

import { getUnhandledProps } from '../lib';

import HourPickerCell from './HourPickerCell';

const HOURS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

class HourPicker extends Component {
  _getRows = hours => {
    const rows = [];
    let rowIndex = 0;
    forEach(hours, (hour, i) => {
      if (i % 4 === 0 && i !== 0) {
        rowIndex += 1;
      }
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(hours[i]);
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
    const { onHourClick, activeHour, shouldShowDayButton } = this.props;
    const rest = getUnhandledProps(HourPicker, this.props);

    const hours = map(HOURS, hour => (
      <HourPickerCell
        onClick={onHourClick}
        active={hour === activeHour}
        hour={hour}
        key={hour}
      />
    ));
    const rows = map(this._getRows(hours), (row, i) => (
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
              <Icon name="calendar" />
              Day
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    );
  }
}

HourPicker.propTypes = {
  /** (event, data) => {} */
  onHourClick: PropTypes.func.isRequired,
  activeHour: PropTypes.string,
  shouldShowDayButton: PropTypes.bool,
  switchMode: PropTypes.func,
};

export default HourPicker;
