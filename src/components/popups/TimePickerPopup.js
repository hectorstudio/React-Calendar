import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { HourPickerPopup, MinutePickerPopup, PickerHeader } from '..';

const TimePickerPopup = ({
  selectedDate,
  onNextDayBtnClick,
  onPrevDayBtnClick,
  onHourClick,
  onMinuteClick,
  activeHour,
  activeMinute,
  mode,
  switchMode,
  inputType,
  closePopup,
}) => {
  if (mode === 'minute') {
    return (
      <>
        {selectedDate && (
          <PickerHeader
            width="3"
            includeDay
            activeDate={selectedDate}
            onNextBtnClick={onNextDayBtnClick}
            onPrevBtnClick={onPrevDayBtnClick}
          />
        )}
        <MinutePickerPopup
          hour={activeHour}
          activeMinute={activeMinute}
          onMinuteClick={onMinuteClick}
          switchMode={switchMode}
          inputType={inputType}
          closePopup={closePopup}
        />
      </>
    );
  } else {
    return (
      <>
        {selectedDate && (
          <PickerHeader
            width="4"
            includeDay
            activeDate={selectedDate}
            onNextBtnClick={onNextDayBtnClick}
            onPrevBtnClick={onPrevDayBtnClick}
          />
        )}
        <HourPickerPopup
          activeHour={activeHour}
          onHourClick={onHourClick}
          switchMode={switchMode}
          inputType={inputType}
        />
      </>
    );
  }
};

TimePickerPopup.propTypes = {
  /** (event, data) => {} */
  onHourClick: PropTypes.func.isRequired,
  /** (event, data) => {} */
  onMinuteClick: PropTypes.func.isRequired,
  /** Show date in header if given */
  selectedDate: PropTypes.instanceOf(moment),
  activeHour: PropTypes.string,
  activeMinute: PropTypes.string,
  onNextDayBtnClick: PropTypes.func,
  onPrevDayBtnClick: PropTypes.func,
  switchMode: PropTypes.func,
  mode: PropTypes.string,
};

TimePickerPopup.defaultProps = {
  mode: 'hour',
};

export default TimePickerPopup;
