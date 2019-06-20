import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, DatePickerComponent } from '../';

const DayMode = ({
  handleHeaderDateClick,
  showNextMonth,
  showPrevMonth,
  dateToShow,
  onDateClick,
  activeDate,
  switchMode,
  shouldShowTimeButton,
  shouldShowClosePopupButton,
  closePopup,
}) => {
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
        switchMode={switchMode}
        closePopup={closePopup}
        shouldShowTimeButton={shouldShowTimeButton}
        shouldShowClosePopupButton={shouldShowClosePopupButton}
      />
    </React.Fragment>
  );
};

DayMode.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  onDateClick: PropTypes.func,
  dateToShow: PropTypes.object,
  activeDate: PropTypes.object,
  switchMode: PropTypes.func,
  closePopup: PropTypes.func,
  shouldShowTimeButton: PropTypes.bool,
  shouldShowClosePopupButton: PropTypes.bool,
};

export default DayMode;
export { DayMode };
