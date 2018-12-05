import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'semantic-ui-react';
import moment from 'moment';

import { CustomDatesRangeInput, DateInput, DateTimeInput } from '../src';

moment.locale('en');

function App() {
  return (
    <div className="example-calendar-container">
      <h2>As text fields</h2>
      <DateTimeForm />
    </div>
  );
}

class DateTimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customDateRanges: {
        start: moment(),
        end: moment(),
      },
      date: moment(),
      dateTime: moment(),
      message: '',
    };
  }

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
      <Form>
        <br />
        <div>CUSTOM</div>
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
        />
      </Form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
