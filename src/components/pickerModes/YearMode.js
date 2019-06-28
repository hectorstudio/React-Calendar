import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { PickerHeader, YearPickerPopup } from '../';

const YearMode = ({
  onHeaderDateClick,
  yearsRange,
  onPrevBtnClick,
  onNextBtnClick,
  onYearClick,
  value,
  switchMode,
  inputType,
}) => (
  <Fragment>
    <PickerHeader
      width="3"
      onDateClick={onHeaderDateClick}
      activeYears={yearsRange}
      onPrevBtnClick={onPrevBtnClick}
      onNextBtnClick={onNextBtnClick}
    />
    <YearPickerPopup
      onYearClick={onYearClick}
      activeYear={value}
      yearsStart={yearsRange.start}
      switchMode={switchMode}
      inputType={inputType}
    />
  </Fragment>
);

YearMode.propTypes = {
  onHeaderDateClick: PropTypes.func,
  yearsRange: PropTypes.object,
  onPrevBtnClick: PropTypes.func,
  onNextBtnClick: PropTypes.func,
  onYearClick: PropTypes.func,
  switchMode: PropTypes.func,
  value: PropTypes.string,
  inputType: PropTypes.string,
};
export default YearMode;
