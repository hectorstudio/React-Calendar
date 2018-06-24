import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'semantic-ui-react';
import moment from 'moment';

import { CustomDatesRangeInput } from '../src';

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
      year: '',
      month: '',
      date: '',
      dateStartYear: '',
      time: '',
      dateTime: '',
      datesRange: '',
      customDateRanges: {
        start: moment(),
        end: moment(),
      },
    };
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Form>
        <br />
        <div>CUSTOM</div>
        <CustomDatesRangeInput
          dateFormat="DD/MM/YYYY"
          placeholder="From - To"
          className="example-calendar-input"
          name="datesRange"
          iconPosition="left"
          datesRange={this.state.customDateRanges}
        />
      </Form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
