import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, MonthPickerComponent } from '../';

const MonthMode = ({
  handleHeaderDateClick,
  showNextYear,
  showPrevYear,
  dateToShow,
  onMonthChange,
}) => (
  <Fragment>
    <PickerHeader
      onDateClick={handleHeaderDateClick}
      onNextBtnClick={showNextYear}
      onPrevBtnClick={showPrevYear}
      activeYear={dateToShow.format('YYYY')}
      width="3"
    />
    <MonthPickerComponent
      activeMonth={dateToShow.format('MMM')}
      onMonthClick={onMonthChange}
    />
  </Fragment>
);

MonthMode.propTypes = {
  handleHeaderDateClick: PropTypes.func,
  showNextYear: PropTypes.func,
  showPrevYear: PropTypes.func,
  onMonthChange: PropTypes.func,
  dateToShow: PropTypes.object,
};

export default MonthMode;
