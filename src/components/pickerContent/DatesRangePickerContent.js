import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, DayPickerPopup } from '../';

const DatesRangePickerContent = props => {
  const {
    handleHeaderDateClick,
    showNextMonth,
    showPrevMonth,
    dateToShow,
    datesRange,
    closePopup,
    setDatesRange,
    inputType,
    switchMode,
  } = props;
  return (
    <>
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
      <DayPickerPopup
        datesRange={datesRange}
        setDatesRange={setDatesRange}
        showedMonth={dateToShow}
        inputType={inputType}
        switchMode={switchMode}
      />
    </>
  );
};
DatesRangePickerContent.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  dateToShow: PropTypes.object,
  datesRange: PropTypes.object,
  setDatesRange: PropTypes.func,
  closePopup: PropTypes.func,
  inputType: PropTypes.string,
  switchMode: PropTypes.func,
};

export default DatesRangePickerContent;
