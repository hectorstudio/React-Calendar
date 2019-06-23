import { Component } from 'react';

class YearPickerMixin extends Component {
  onNextBtnClick = () => {
    this.setState(({ yearsStart }) => {
      return { yearsStart: yearsStart + 12 };
    });
  };

  onPrevBtnClick = () => {
    this.setState(({ yearsStart }) => {
      return { yearsStart: yearsStart - 12 };
    });
  };

  getYearsRange() {
    const { yearsStart } = this.state;
    return {
      start: yearsStart,
      end: yearsStart + 11,
    };
  }
}

export default YearPickerMixin;
