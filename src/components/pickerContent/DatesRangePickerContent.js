import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, DatePickerComponent } from '../';

function DatesRangePickerContent(props) {
  const {
    handleHeaderDateClick,
    showNextMonth,
    showPrevMonth,
    dateToShow,
    datesRange,
    setDatesRange,
    closePopup,
  } = props;
  return (
    <React.Fragment>
      <PickerHeader
        onDateClick={handleHeaderDateClick}
        onNextBtnClick={showNextMonth}
        onPrevBtnClick={showPrevMonth}
        activeDate={dateToShow}
        activeDatesRange={datesRange}
        showWeeks
        width="7"
        closePopup={closePopup}
      />
      <DatePickerComponent
        datesRange={datesRange}
        onDateClick={setDatesRange}
        showedMonth={dateToShow}
      />
    </React.Fragment>
  );
}
DatesRangePickerContent.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  dateToShow: PropTypes.string,
  datesRange: PropTypes.string,
  setDatesRange: PropTypes.func,
  closePopup: PropTypes.func,
};

export default DatesRangePickerContent;
export { DatesRangePickerContent };
