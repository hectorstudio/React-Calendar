import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, YearPickerComponent } from '../';

const YearMode = ({
  onHeaderDateClick,
  yearsRange,
  onPrevBtnClick,
  onNextBtnClick,
  onYearClick,
  value,
}) => (
  <Fragment>
    <PickerHeader
      width="3"
      onDateClick={onHeaderDateClick}
      activeYears={yearsRange}
      onPrevBtnClick={onPrevBtnClick}
      onNextBtnClick={onNextBtnClick}
    />
    <YearPickerComponent
      onYearClick={onYearClick}
      activeYear={value}
      yearsStart={yearsRange.start}
    />
  </Fragment>
);

YearMode.propTypes = {
  onHeaderDateClick: PropTypes.func,
  yearsRange: PropTypes.object,
  onPrevBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
  onYearClick: PropTypes.func,
  value: PropTypes.string,
};
export default YearMode;
export { YearMode };
