import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, MonthPickerPopup } from '../';

const MonthMode = ({
  handleHeaderDateClick,
  showNextYear,
  showPrevYear,
  dateToShow,
  onMonthChange,
  inputType,
  switchMode,
}) => (
  <Fragment>
    <PickerHeader
      onDateClick={handleHeaderDateClick}
      onNextBtnClick={showNextYear}
      onPrevBtnClick={showPrevYear}
      activeYear={dateToShow.format('YYYY')}
      width="3"
    />
    <MonthPickerPopup
      switchMode={switchMode}
      activeMonth={dateToShow.format('MMM')}
      onMonthClick={onMonthChange}
      inputType={inputType}
    />
  </Fragment>
);

MonthMode.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextYear: PropTypes.func,
  showPrevYear: PropTypes.func,
  onMonthChange: PropTypes.func,
  dateToShow: PropTypes.object,
  inputType: PropTypes.string,
  switchMode: PropTypes.func,
};

export default MonthMode;
