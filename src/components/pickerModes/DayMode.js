import React from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, DayPickerPopup } from '../';

const DayMode = ({
  handleHeaderDateClick,
  showNextMonth,
  showPrevMonth,
  dateToShow,
  onDateClick,
  activeDate,
  switchMode,
  closePopup,
  inputType,
}) => {
  return (
    <>
      <PickerHeader
        onDateClick={handleHeaderDateClick}
        onNextBtnClick={showNextMonth}
        onPrevBtnClick={showPrevMonth}
        activeDate={dateToShow}
        showWeeks
        width="7"
      />
      <DayPickerPopup
        onDateClick={onDateClick}
        activeDate={activeDate}
        showedMonth={dateToShow}
        switchMode={switchMode}
        closePopup={closePopup}
        inputType={inputType}
      />
    </>
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
  inputType: PropTypes.string,
};

export default DayMode;
