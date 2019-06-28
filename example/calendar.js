import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import { CustomDatesRangeInput, DateInput, DateTimeInput } from '../src';

moment.locale('en');

class App extends Component {
  state = {
    customDateRanges: {
      start: moment(),
      end: moment(),
    },
    date: moment(),
    dateTime: moment(),
    message: '',
  };
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };
  _onRangeChange = datesRange => {
    this.setState({ customDateRanges: datesRange });
  };
  _onDateChange = date => {
    this.setState({ date });
  };
  _onDateTimeChange = dateTime => {
    this.setState({ dateTime });
  };
  _onValidated = () => {
    this.setState({ message: 'validated' });
  };
  _onValidateError = () => {
    this.setState({ message: 'error' });
  };
  render() {
    const { customDateRanges, date, dateTime, message } = this.state;

    return (
      <>
        <div>{message}</div>
        <CustomDatesRangeInput
          dateFormat="DD-MM-YYYY"
          onValidateError={this._onValidateError}
          onValidated={this._onValidated}
          placeholder="From - To"
          className="example-calendar-input"
          name="datesRange"
          iconPosition="left"
          datesRange={customDateRanges}
          onRangeChange={this._onRangeChange}
        />
        <DateInput
          dateFormat="DD-MM-YYYY"
          placeholder="From"
          className="example-calendar-input"
          name="dateInput"
          iconPosition="left"
          value={date}
          onValidateError={this._onValidateError}
          onValidated={this._onValidated}
          onChange={this._onDateChange}
          nullMessage="No Expired Date"
        />
        <DateTimeInput
          dateTimeFormat="DD-MM-YYYY hh:mm:ss A"
          placeholder="From"
          className="example-calendar-input"
          name="dateTimeInput"
          iconPosition="left"
          dateTimeValue={dateTime}
          onValidateError={this._onValidateError}
          onValidated={this._onValidated}
          onDateTimeChange={this._onDateTimeChange}
          nullMessage="No Expired Date"
        />
        <Popup
          content="Add users to your feed"
          trigger={<Button icon="add" />}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
