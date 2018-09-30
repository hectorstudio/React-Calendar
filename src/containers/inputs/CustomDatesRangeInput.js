import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggled';
import split from 'lodash/split';
import trim from 'lodash/trim';
import moment from 'moment';

import { DATES_RANGE_INPUT } from '../../lib/COMPONENT_TYPES';
import { DatesRangePickerContent } from '../../components/pickerContent/DatesRangePickerContent.js';
import {
  ControlledCustomPopup as Popup,
  CustomInput as Input,
  withStateInput,
} from '../';

const validateDatesRange = (date, dateFormat, onValidateError, onValidated) => {
  const splitData = split(date, ' - ');
  if (splitData.length == 2) {
    const start = moment(trim(splitData[0]), dateFormat, true);
    const end = moment(trim(splitData[1]), dateFormat, true);
    if (start.isValid() && end.isValid()) {
      onValidated();
      return { start, end };
    }
  }
  onValidateError();
};

class CustomDatesRangeInput extends Component {
  static META = {
    type: DATES_RANGE_INPUT,
    name: 'CustomDatesRangeInput',
  };
  constructor(props) {
    super(props);
    const { datesRange } = props;
    if (datesRange) {
      const { start, end } = datesRange;
      const { dateFormat } = props;
      const datesRangeInputValue = `${
        start ? start.format(dateFormat) : ''
      } - ${end ? end.format(dateFormat) : ''}`;
      this.state = {
        datesRangeInputValue,
      };
    }
  }
  componentWillReceiveProps = nextProps => {
    const { datesRange } = nextProps;
    if (datesRange) {
      const { start, end } = datesRange;
      const { dateFormat } = this.props;
      const datesRangeInputValue = `${
        start ? start.format(dateFormat) : ''
      } - ${end ? end.format(dateFormat) : ''}`;
      this.setState({ datesRangeInputValue });
    }
  };
  getPicker() {
    const {
      handleHeaderDateClick,
      showNextMonth,
      showPrevMonth,
      dateToShow,
      datesRange,
      setDatesRange,
    } = this.props;
    return (
      <Table unstackable celled textAlign="center">
        <DatesRangePickerContent
          handleHeaderDateClick={handleHeaderDateClick}
          showNextMonth={showNextMonth}
          showPrevMonth={showPrevMonth}
          dateToShow={dateToShow}
          datesRange={datesRange}
          setDatesRange={setDatesRange}
        />
      </Table>
    );
  }
  _onChange = e => {
    const value = e.target.value;
    const {
      dateFormat,
      setStartEndDatesRange,
      onValidateError,
      onValidated,
    } = this.props;
    const date = validateDatesRange(
      value,
      dateFormat,
      onValidateError,
      onValidated,
    );
    if (date) {
      setStartEndDatesRange(null, date);
    }
    this.setState({ datesRangeInputValue: value });
  };
  _getInput = () => {
    const {
      className,
      iconPosition,
      mode,
      name,
      placeholder,
      icon,
    } = this.props;
    const { datesRangeInputValue } = this.state;

    return (
      <Input
        className={className}
        iconPosition={iconPosition}
        mode={mode}
        name={name}
        placeholder={placeholder}
        ref={this.input}
        onChange={this._onChange}
        icon={icon}
        fluid
        value={datesRangeInputValue}
      />
    );
  };
  render() {
    const {
      popupPosition,
      inline,
      setDatesRange,
      setStartEndDatesRange,
    } = this.props;

    if (inline) {
      return this.getPicker();
    }
    return (
      <Toggle initial={false}>
        {({ on, setOff, setOn }) => (
          <Popup
            position={popupPosition}
            trigger={this._getInput()}
            popupState={on}
            handleClose={setOff}
            handleOpen={setOn}
            setDatesRange={setDatesRange}
            setStartEndDatesRange={setStartEndDatesRange}
          >
            {this.getPicker()}
          </Popup>
        )}
      </Toggle>
    );
  }
}

CustomDatesRangeInput.propTypes = {
  /** Called on change.
   * @param {SyntheticEvent} event React's original SyntheticEvent.
   * @param {object} data All props and proposed value.
   */
  /** Same as semantic-ui-react Input's ``icon`` prop. */
  icon: PropTypes.any,
  /** Date formatting string.
   * Anything that that can be passed to ``moment().format``.
   */
  onValidateError: PropTypes.func,
  onValidated: PropTypes.func,
  dateFormat: PropTypes.string,
  /** Character that used to divide dates in string. */
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
  handleHeaderDateClick: PropTypes.func,
  showNextMonth: PropTypes.func,
  showPrevMonth: PropTypes.func,
  dateToShow: PropTypes.object,
  datesRange: PropTypes.object,
  setDatesRange: PropTypes.func,
  setStartEndDatesRange: PropTypes.func,
  className: PropTypes.string,
  iconPosition: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

CustomDatesRangeInput.defaultProps = {
  icon: 'calendar',
  inline: false,
};

const WrappedDatesRangeInput = withStateInput(CustomDatesRangeInput);

export default WrappedDatesRangeInput;
export { WrappedDatesRangeInput as CustomDatesRangeInput };
