import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';
import moment from 'moment';

import { CustomPopup, CustomInput, withStateInput } from '../';
import YearPickerMixin from '../yearPickerMixin';
import { DATE_INPUT } from '../../lib/COMPONENT_TYPES';
import DatePickerContent from '../../components/pickerContent/DatePickerContent';

const validateDate = (date, dateFormat, onValidateError, onValidated) => {
  const mmDate = moment(trim(date), dateFormat, true);
  if (mmDate.isValid()) {
    if (onValidated) onValidated();
    return mmDate;
  }
  if (onValidateError) onValidateError();
};

class DateInput extends YearPickerMixin {
  static META = {
    type: DATE_INPUT,
    name: 'DateInput',
  };
  state = {
    isOpenPopup: false,
  };
  constructor(props) {
    super(props);

    const { value, dateFormat, nullMessage } = props;
    this.state = {
      yearsStart: props.dateToShow.year() - 6,
      dateValue: value ? value.format(dateFormat) : nullMessage,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { value } = nextProps;
    const { dateFormat } = this.props;
    if (value) {
      const strDate = value.format(dateFormat);
      if (strDate !== this.lastValue) {
        this.lastValue = strDate;
        this.setState({ dateValue: strDate });
      }
    }
  };

  getPicker() {
    const {
      setDatesRange,
      onYearChange,
      showNextYear,
      showPrevYear,
      dateToShow,
      onMonthChange,
      showNextMonth,
      showPrevMonth,
      onDateClick,
      activeDate,
      handleHeaderDateClick,
      mode,
      switchMode,
    } = this.props;
    return (
      <Table unstackable celled textAlign="center">
        <DatePickerContent
          mode={mode}
          handleHeaderDateClick={handleHeaderDateClick}
          onYearChange={onYearChange}
          showNextYear={showNextYear}
          showPrevYear={showPrevYear}
          dateToShow={dateToShow}
          onMonthChange={onMonthChange}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          onDateClick={onDateClick}
          activeDate={activeDate}
          yearsRange={this.getYearsRange()}
          onPrevBtnClick={this.onPrevBtnClick}
          onNextBtnClick={this.onNextBtnClick}
          setDatesRange={setDatesRange}
          closePopup={this._handleClosePopup}
          switchMode={switchMode}
          inputType="date"
        />
      </Table>
    );
  }

  _onChange = e => {
    const value = e.target.value;
    const { dateFormat, onChange, onValidateError, onValidated } = this.props;
    const date = validateDate(value, dateFormat, onValidateError, onValidated);
    if (date) {
      const finalDate = onChange.startOf('day');
      onChange(finalDate);
    }
    this.setState({ dateValue: value });
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

    const { dateValue, isOpenPopup } = this.state;

    const inputElement = (
      <CustomInput
        className={className}
        iconPosition={iconPosition}
        mode={mode}
        name={name}
        placeholder={placeholder}
        icon={icon}
        value={dateValue}
        onChange={this._onChange}
        fluid
      />
    );

    if (inline) {
      return this.getPicker();
    }
    return (
      <CustomPopup
        position={popupPosition}
        trigger={inputElement}
        open={isOpenPopup}
        onClose={this._handleClosePopup}
        onOpen={this._handleOpenPopup}
        on="click"
        inputType="date"
      >
        {this.getPicker()}
      </CustomPopup>
    );
  }
}

DateInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  onChange: PropTypes.func,
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.
   * Anything that that can be passed to ``moment().format``
   **/
  dateFormat: PropTypes.string,
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

DateInput.defaultProps = {
  icon: 'calendar',
  dateFormat: 'DD-MM-YYYY',
  startMode: 'day',
  inline: false,
  nullMessage: 'Null',
};

const WrappedDateInput = withStateInput(DateInput);

export default WrappedDateInput;
