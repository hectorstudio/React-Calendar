import React, { Component } from 'react';
import { Popup, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import map from 'lodash/map';

const CustomButton = ({ content, icon, onClick, start, end }) => (
  <div className="right-column-button-wrapper">
    <Button
      content={content}
      icon={icon}
      onClick={onClick ? onClick(start, end) : null}
      fluid
    />
  </div>
);
CustomButton.propTypes = {
  content: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  start: PropTypes.instanceOf(moment),
  end: PropTypes.instanceOf(moment),
};

class ControlledCustomPopup extends Component {
  data = [
    {
      content: 'Today',
      start: moment().startOf('day'),
      end: moment().endOf('day'),
    },
    {
      content: 'Yesterday',
      start: moment()
        .add(-1, 'days')
        .startOf('day'),
      end: moment().endOf('day'),
    },
    {
      content: 'This Week',
      start: moment()
        .day(1)
        .startOf('day'),
      end: moment()
        .day(7)
        .endOf('day'),
    },
    {
      content: 'Last Week',
      start: moment()
        .subtract(1, 'weeks')
        .day(1)
        .startOf('day'),
      end: moment()
        .subtract(1, 'weeks')
        .day(7)
        .endOf('day'),
    },
    {
      content: 'Last 2 Weeks',
      start: moment()
        .subtract(2, 'weeks')
        .day(1)
        .startOf('day'),
      end: moment()
        .subtract(1, 'weeks')
        .day(7)
        .endOf('day'),
    },
    {
      content: 'This month',
      start: moment()
        .startOf('month')
        .startOf('day'),
      end: moment()
        .endOf('month')
        .endOf('day'),
    },
    {
      content: 'Last month',
      start: moment()
        .subtract(1, 'months')
        .startOf('month')
        .startOf('day'),
      end: moment()
        .subtract(1, 'months')
        .endOf('month')
        .endOf('day'),
    },
  ];
  _onButtonClick = (start, end) => event => {
    event.stopPropagation();
    this._setStartEnd(start, end);
  };
  _setStartEnd = (start, end) => {
    const { setStartEndDatesRange } = this.props;
    const datesRange = {
      start,
      end,
    };
    setStartEndDatesRange(event, datesRange);
  };
  render() {
    const {
      popupState,
      handleClose,
      handleOpen,
      children,
      trigger,
    } = this.props;
    return (
      <Popup
        trigger={trigger}
        flowing
        id="suirCalendarPopup"
        open={popupState}
        on="click"
        onClose={handleClose}
        onOpen={handleOpen}
        className="suir-calendar popup"
      >
        <Popup.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{children}</Grid.Column>
              <Grid.Column width={6}>
                <div className="right-column-button-wrapper">
                  <Button
                    content="Ok"
                    icon="check"
                    onClick={handleClose}
                    fluid
                    color="blue"
                  />
                </div>
                {map(this.data, d => (
                  <CustomButton
                    key={d.content}
                    content={d.content}
                    onClick={this._onButtonClick}
                    start={d.start}
                    end={d.end}
                  />
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Popup.Content>
      </Popup>
    );
  }
}

ControlledCustomPopup.propTypes = {
  popupState: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  children: PropTypes.object,
  trigger: PropTypes.object,
  setStartEndDatesRange: PropTypes.func,
};

export default ControlledCustomPopup;
