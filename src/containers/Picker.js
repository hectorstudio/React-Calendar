import React from 'react';
import { DatePickerComponent, DateTimePickerHeader } from '../components';
import { TimePickerComponent } from '../components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDate: '',
      showedMonth: moment(),
      activeHour: '',
      activeMinute: ''
    };
  }

  onDateClick = (clickedDate) => {
    this.setState({
      activeDate: clickedDate
    });
  }

  onHourClick = (clickedHour) => {
    this.setState({
      activeHour: clickedHour
    });
  }

  onMinuteClick = (clickedMinute) => {
    this.setState({
      activeMinute: clickedMinute
    });
  }

  onNextBtnClick = () => {
    this.setState(({ showedMonth }) => {
      let nextMonth = showedMonth.clone();
      nextMonth.add(1, 'M');
      return { showedMonth: nextMonth };
    });
  }

  onPrevBtnClick = () => {
    this.setState(({ showedMonth }) => {
      let prevMonth = showedMonth.clone();
      prevMonth.add(-1, 'M');
      return { showedMonth: prevMonth };
    });
  }

  getActiveDate = () => {
    return this.state.activeDate || moment();
  }

  getDateTimePicker = () => {
    const {
      activeDate,
      activeHour,
      activeMinute,
      showedMonth
    } = this.state;
    const headerWidth = activeHour? '3' : activeDate? '4' : '7';
    if (!activeDate) {
      return (
        <React.Fragment>
          <DateTimePickerHeader
            onNextBtnClick={this.onNextBtnClick}
            onPrevBtnClick={this.onPrevBtnClick}
            showedDate={showedMonth}
            showDate={false}
            showWeeks={true}
            width="7" />
          <DatePickerComponent
            onDateClick={this.onDateClick}
            activeDate={this.getActiveDate()}
            showedMonth={showedMonth} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <DateTimePickerHeader
          onNextBtnClick={this.onNextBtnClick}
          onPrevBtnClick={this.onPrevBtnClick}
          showedDate={activeDate}
          showDate
          showWeeks={false}
          width={headerWidth} />
        <TimePickerComponent
          activeHour={activeHour}
          activeMinute={activeMinute}
          onHourClick={this.onHourClick}
          onMinuteClick={this.onMinuteClick} />
      </React.Fragment>
    );
  }

  render() {
    const {
      pickDate,
      pickTime,
      pickDateTime
    } = this.props;
    if (pickDate) {
      return (
        <Table unstackable celled textAlign="center">
          <DateTimePickerHeader
            onNextBtnClick={this.onNextBtnClick}
            onPrevBtnClick={this.onPrevBtnClick}
            showedDate={this.state.showedMonth}
            showDate={false}
            showWeeks={true}
            width="7" />
          <DatePickerComponent
            onDateClick={this.onDateClick}
            activeDate={this.getActiveDate()}
            showedMonth={this.state.showedMonth} />
        </Table>
      );
    }
    if (pickTime) {
      return (
        <Table unstackable celled textAlign="center">
          <TimePickerComponent
            activeHour={this.state.activeHour}
            activeMinute={this.state.activeMinute}
            onHourClick={this.onHourClick}
            onMinuteClick={this.onMinuteClick} />
        </Table>
      );
    }
    if (pickDateTime) {
      return (
        <Table unstackable celled textAlign="center">
          { this.getDateTimePicker() }
        </Table>
      );
    }
  }
}

Picker.propTypes = {
  pickDate: PropTypes.bool,
  pickTime: PropTypes.bool,
  pickDateTime: PropTypes.bool
};

Picker.defaultProps = {
  pickDate: false,
  pickTime: false,
  pickDateTime: false
};

export default Picker;
export {
  Picker
};