import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, TimePickerComponent } from '../';

import DatePickerContent from './DatePickerContent';

const DateTimePickerContent = ({
  activeDate,
  activeHour,
  activeMinute,
  mode,
  handleHeaderDateClick,
  handleHeaderTimeClick,
  onYearChange,
  showNextMonth,
  showPrevMonth,
  showNextYear,
  showPrevYear,
  showNextDay,
  showPrevDay,
  dateToShow,
  onMonthChange,
  onDateClick,
  onHourClick,
  onMinuteClick,
  yearsRange,
  onPrevBtnClick,
  onNextBtnClick,
  switchMode,
  closePopup,
  shouldShowTimeButton,
  shouldShowDayButton,
}) => {
  const headerWidth = mode === 'minute' ? '3' : mode === 'hour' ? '4' : '7';
  if (mode !== 'hour' && mode !== 'minute') {
    return (
      <DatePickerContent
        mode={mode}
        handleHeaderDateClick={handleHeaderDateClick}
        onYearChange={onYearChange}
        showNextYear={showNextYear}
        showPrevYear={showPrevYear}
        dateToShow={dateToShow}
        onMonthChange={onMonthChange}
        showNextMonth={showNextMonth}
        showPrevMonth={showPrevMonth}
        onDateClick={onDateClick}
        activeDate={activeDate}
        yearsRange={yearsRange}
        onPrevBtnClick={onPrevBtnClick}
        onNextBtnClick={onNextBtnClick}
        switchMode={switchMode}
        shouldShowTimeButton={shouldShowTimeButton}
        closePopup={closePopup}
      />
    );
  }
  return (
    <React.Fragment>
      <PickerHeader
        onDateClick={handleHeaderTimeClick}
        onNextBtnClick={showNextDay}
        onPrevBtnClick={showPrevDay}
        activeDate={activeDate}
        includeDay
        width={headerWidth}
      />
      <TimePickerComponent
        mode={mode}
        activeHour={activeHour}
        activeMinute={activeMinute}
        onHourClick={onHourClick}
        onMinuteClick={onMinuteClick}
        switchMode={switchMode}
        shouldShowDayButton={shouldShowDayButton}
      />
    </React.Fragment>
  );
};

DateTimePickerContent.propTypes = {
  activeDate: PropTypes.object,
  activeHour: PropTypes.string,
  activeMinute: PropTypes.string,
  mode: PropTypes.string,
  dateToShow: PropTypes.object,
  handleHeaderDateClick: PropTypes.func,
  handleHeaderTimeClick: PropTypes.func,
  onYearChange: PropTypes.func,
  showNextMonth: PropTypes.func,
  showNextYear: PropTypes.func,
  showPrevMonth: PropTypes.func,
  showPrevYear: PropTypes.func,
  showNextDay: PropTypes.func,
  showPrevDay: PropTypes.func,
  onMonthChange: PropTypes.func,
  onDateClick: PropTypes.func,
  onHourClick: PropTypes.func,
  onMinuteClick: PropTypes.func,
  yearsRange: PropTypes.object,
  onPrevBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
  shouldShowDayButton: PropTypes.bool,
  shouldShowTimeButton: PropTypes.bool,
};
export default DateTimePickerContent;
