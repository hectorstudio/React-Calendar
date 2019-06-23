import React from 'react';
import PropTypes from 'prop-types';

import MonthMode from '../pickerModes/MonthMode';
import DayMode from '../pickerModes/DayMode';
import YearMode from '../pickerModes/YearMode';

const DatePickerContent = ({
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
  switchMode,
  shouldShowTimeButton,
  closePopup,
}) => {
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
        shouldShowClosePopupButton={true}
        closePopup={closePopup}
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
        shouldShowClosePopupButton={true}
        closePopup={closePopup}
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
      switchMode={switchMode}
      shouldShowTimeButton={shouldShowTimeButton}
      shouldShowClosePopupButton={true}
      closePopup={closePopup}
    />
  );
};

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
  shouldShowTimeButton: PropTypes.bool,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
};
export default DatePickerContent;
