import React from 'react';
import PropTypes from 'prop-types';

import { MonthMode } from '../pickerModes/MonthMode.js';
import { DayMode } from '../pickerModes/DayMode.js';
import { YearMode } from '../pickerModes/YearMode.js';

function DatePickerContent(props) {
  const {
    mode,
    handleHeaderDateClick,
    onYearChange,
    showNextYear,
    showPrevYear,
    dateToShow,
    onMonthChange,
    showNextMonth,
    showPrevMonth,
    onDateClick,
    activeDate,
    yearsRange,
    onPrevBtnClick,
    onNextBtnClick,
  } = props;
  if (mode === 'year') {
    const value =
      activeDate && activeDate.isValid() ? activeDate.format('YYYY') : '';
    return (
      <YearMode
        onHeaderDateClick={handleHeaderDateClick}
        yearsRange={yearsRange}
        onPrevBtnClick={onPrevBtnClick}
        onNextBtnClick={onNextBtnClick}
        onYearClick={onYearChange}
        value={value}
      />
    );
  }
  if (mode === 'month') {
    return (
      <MonthMode
        handleHeaderDateClick={handleHeaderDateClick}
        showNextYear={showNextYear}
        showPrevYear={showPrevYear}
        dateToShow={dateToShow}
        onMonthChange={onMonthChange}
      />
    );
  }
  return (
    <DayMode
      handleHeaderDateClick={handleHeaderDateClick}
      showNextMonth={showNextMonth}
      showPrevMonth={showPrevMonth}
      dateToShow={dateToShow}
      onDateClick={onDateClick}
      activeDate={activeDate}
    />
  );
}

DatePickerContent.propTypes = {
  mode: PropTypes.string,
  handleHeaderDateClick: PropTypes.func,
  onYearChange: PropTypes.func,
  showNextYear: PropTypes.func,
  showPrevYear: PropTypes.func,
  dateToShow: PropTypes.object,
  onMonthChange: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  onDateClick: PropTypes.func,
  activeDate: PropTypes.object,
  yearsRange: PropTypes.object,
  onPrevBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
};
export default DatePickerContent;
export { DatePickerContent };
