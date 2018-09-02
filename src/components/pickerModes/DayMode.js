import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, DatePickerComponent } from '../';

function DayMode(props) {
  const {
    handleHeaderDateClick,
    showNextMonth,
    showPrevMonth,
    dateToShow,
    onDateClick,
    activeDate,
  } = props;
  return (
    <React.Fragment>
      <PickerHeader
        onDateClick={handleHeaderDateClick}
        onNextBtnClick={showNextMonth}
        onPrevBtnClick={showPrevMonth}
        activeDate={dateToShow}
        showWeeks
        width="7"
      />
      <DatePickerComponent
        onDateClick={onDateClick}
        activeDate={activeDate}
        showedMonth={dateToShow}
      />
    </React.Fragment>
  );
}

DayMode.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  onDateClick: PropTypes.func,
  dateToShow: PropTypes.object,
  activeDate: PropTypes.object,
};

export default DayMode;
export { DayMode };
