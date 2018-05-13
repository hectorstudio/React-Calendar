import React from 'react';
import { HourPicker, MinutePicker, DateTimePickerHeader } from '.';
import PropTypes from 'prop-types';
import moment from 'moment';

function TimePickerComponent(props) {
  const {
    selectedDate,
    onNextDayBtnClick,
    onPrevDayBtnClick,
    onHourClick,
    onMinuteClick,
    activeHour,
    activeMinute
  } = props;

  if (activeHour) {
    return (
      <React.Fragment>
        { selectedDate && (
          <DateTimePickerHeader
            width="3"
            showWeeks={false}
            showDate
            showedDate={selectedDate}
            onNextBtnClick={onNextDayBtnClick}
            onPrevBtnClick={onPrevDayBtnClick} />
        ) }
        <MinutePicker
          hour={activeHour}
          activeMinute={activeMinute}
          onTimeClick={onMinuteClick} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        { selectedDate && (
          <DateTimePickerHeader
            width="4"
            showWeeks={false}
            showDate
            showedDate={selectedDate}
            onNextBtnClick={onNextDayBtnClick}
            onPrevBtnClick={onPrevDayBtnClick} />
        ) }
        <HourPicker
          activeHour={activeHour}
          onTimeClick={onHourClick} />
      </React.Fragment>
    );
  }
}

TimePickerComponent.propTypes = {
  onHourClick: PropTypes.func.isRequired,
  onMinuteClick: PropTypes.func.isRequired,
  /** Show date in header if given */
  selectedDate: PropTypes.instanceOf(moment),
  activeHour: PropTypes.string,
  activeMinute: PropTypes.string,
  onNextDayBtnClick: PropTypes.func,
  onPrevDayBtnClick: PropTypes.func
};

export default TimePickerComponent;
export {
  TimePickerComponent
};