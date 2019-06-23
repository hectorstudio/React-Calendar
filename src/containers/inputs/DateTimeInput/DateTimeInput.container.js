import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';
import moment from 'moment';

import {
  CustomPopup as Popup,
  CustomInput as Input,
  withStateInput,
} from '../..';
import YearPickerMixin from '../../yearPickerMixin';
import { DATE_TIME_INPUT } from '../../../lib/COMPONENT_TYPES';
import DateTimePickerContent from '../../../components/pickerContent/DateTimePickerContent';

const validateDate = (date, dateFormat, onValidateError, onValidated) => {
  const mmDate = moment(trim(date), dateFormat, true);
  if (mmDate.isValid()) {
    onValidated();
    return mmDate;
  }
  onValidateError();
};

class DateTimeInput extends YearPickerMixin {
  static META = {
    type: DATE_TIME_INPUT,
    name: 'DateTimeInput',
  };

  constructor(props) {
    super(props);

    this.state = {
      yearsStart: props.dateToShow.year() - 6,
    };

    const { dateTimeValue, dateTimeFormat, nullMessage } = props;
    this.state = {
      isOpenPopup: false,
      yearsStart: props.dateToShow.year() - 6,
      dateTimeValue: dateTimeValue
        ? dateTimeValue.format(dateTimeFormat)
        : nullMessage,
    };
  }

  getPicker() {
    const {
      dateTimeValue,
      activeHour,
      activeMinute,
      mode,
      handleHeaderDateClick,
      handleHeaderTimeClick,
      onYearChange,
      showNextMonth,
      showPrevMonth,
      showNextYear,
      showPrevYear,
      showNextDay,
      showPrevDay,
      onMonthChange,
      onDateClick,
      onHourClick,
      onMinuteClick,
      switchMode,
    } = this.props;

    return (
      <Table unstackable celled textAlign="center">
        <DateTimePickerContent
          activeDate={dateTimeValue}
          dateToShow={dateTimeValue}
          activeHour={activeHour}
          activeMinute={activeMinute}
          mode={mode}
          handleHeaderDateClick={handleHeaderDateClick}
          handleHeaderTimeClick={handleHeaderTimeClick}
          onYearChange={onYearChange}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          showNextYear={showNextYear}
          showPrevYear={showPrevYear}
          showNextDay={showNextDay}
          showPrevDay={showPrevDay}
          onMonthChange={onMonthChange}
          onDateClick={onDateClick}
          onHourClick={onHourClick}
          onMinuteClick={onMinuteClick}
          yearsRange={this.getYearsRange()}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick}
          switchMode={switchMode}
          shouldShowTimeButton={true}
          shouldShowDayButton={true}
          closePopup={this._handleClosePopup}
        />
      </Table>
    );
  }

  componentWillReceiveProps = nextProps => {
    const { dateTimeValue } = nextProps;
    const { dateTimeFormat } = this.props;
    if (dateTimeValue) {
      const strDate = dateTimeValue.format(dateTimeFormat);
      if (strDate !== this.lastValue) {
        this.lastValue = strDate;
        this.setState({ dateTimeValue: strDate });
      }
    }
  };

  _onChange = e => {
    const value = e.target.value;
    const {
      dateTimeFormat,
      onDateTimeChange,
      onValidateError,
      onValidated,
    } = this.props;

    const date = validateDate(
      value,
      dateTimeFormat,
      onValidateError,
      onValidated,
    );
    if (date) {
      onDateTimeChange(date);
    }
    this.setState({ dateTimeValue: value });
  };
  _handleOpenPopup = () => {
    this.setState({ isOpenPopup: true });
  };
  _handleClosePopup = () => {
    this.setState({ isOpenPopup: false });
  };
  render() {
    const {
      className,
      iconPosition,
      mode,
      name,
      placeholder,
      icon,
      inline,
      popupPosition,
    } = this.props;

    const { dateTimeValue, isOpenPopup } = this.state;
    const inputElement = (
      <Input
        className={className}
        iconPosition={iconPosition}
        mode={mode}
        name={name}
        placeholder={placeholder}
        icon={icon}
        value={dateTimeValue}
        onChange={this._onChange}
        fluid
      />
    );

    if (inline) {
      return this.getPicker();
    }
    return (
      <Popup
        position={popupPosition}
        trigger={inputElement}
        open={isOpenPopup}
        onClose={this._handleClosePopup}
        onOpen={this._handleOpenPopup}
        on="click"
      >
        {this.getPicker()}
      </Popup>
    );
  }
}

DateTimeInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  switchMode: PropTypes.func,
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.onValidated
   * Anything that that can be passed to ``moment().format``.
   */
  dateTimeFormat: PropTypes.string,
  dateTimeValue: PropTypes.object,
  startMode: PropTypes.oneOf(['year', 'month', 'day']),
  popupPosition: PropTypes.oneOf([
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'right center',
    'left center',
    'top center',
    'bottom center',
  ]),
  inline: PropTypes.bool,
  onValidateError: PropTypes.func,
  onValidated: PropTypes.func,
  nullMessage: PropTypes.string,
};

DateTimeInput.defaultProps = {
  icon: 'calendar',
  dateFormat: 'DD-MM-YYYY',
  startMode: 'day',
  inline: false,
};

const WrappedDateTimeInput = withStateInput(DateTimeInput);

export default WrappedDateTimeInput;
