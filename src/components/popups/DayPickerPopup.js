import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import map from 'lodash/map';

import {
  isActiveDate,
  isDayInMonth,
  getArrayOfWeeks,
  getUnhandledProps,
} from '../../lib';
import PopupFooter from '../PopupFooter/PopupFooter.component';
import DatePickerCell from '../cells/DatePickerCell';

class DayPickerPopup extends Component {
  _getRow = (week, key) => {
    const {
      setDatesRange,
      activeDate,
      showedMonth,
      datesRange,
      onDateClick,
    } = this.props;
    const finalShowedMonth = showedMonth ? showedMonth : moment();
    const days = map(week, day => {
      const active = isActiveDate(day, activeDate || datesRange);
      const disabled = !isDayInMonth(day, finalShowedMonth);
      return (
        <DatePickerCell
          onClick={setDatesRange || onDateClick}
          active={active}
          disabled={disabled}
          data={day}
          key={day.format('DD-MM-YYYY')}
        />
      );
    });
    return <Table.Row key={key}>{days}</Table.Row>;
  };
  _onDayPickerClicked = (event, data) => {
    const { onDateClick, setDatesRange, inputType, closePopup } = this.props;
    const handler = setDatesRange || onDateClick;
    handler(event, data);
    if (inputType === 'day') closePopup();
  };
  _getTableContent = weeks => {
    return map(weeks, week => this._getRow(week, week[0].format('YYYY-MM-DD')));
  };
  render() {
    const { showedMonth, closePopup, switchMode, inputType } = this.props;
    const rest = getUnhandledProps(DayPickerPopup, this.props);
    const data = getArrayOfWeeks(showedMonth);
    return (
      <>
        <Table.Body {...rest}>{this._getTableContent(data)}</Table.Body>
        <PopupFooter
          inputType={inputType}
          switchMode={switchMode}
          closePopup={closePopup}
          pickerName="Day"
        />
      </>
    );
  }
}

DayPickerPopup.propTypes = {
  /** (event, data) => { do something } */
  setDatesRange: PropTypes.func,
  onDateClick: PropTypes.func,
  /** calendar shows month of this `moment` */
  showedMonth: PropTypes.instanceOf(moment).isRequired,
  /** Currently selected date */
  activeDate: PropTypes.instanceOf(moment),
  /** Dates range */
  datesRange: PropTypes.object,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
  inputType: PropTypes.string,
};

DayPickerPopup.defaultProps = {};
export default DayPickerPopup;
