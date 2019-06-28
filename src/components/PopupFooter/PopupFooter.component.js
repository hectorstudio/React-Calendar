import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import PopupFooterChangeModeButton from '../PopupFooterChangeModeButton/PopupFooterChangeModeButton.component';

const PopupFooter = ({ onChangeModeButtonClicked, pickerName, inputType }) => {
  if (inputType === 'datesRange') return null;
  return (
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan="16" className="p-edit-content__footer">
          <div className="p-edit-content__footer--wrapper">
            {inputType === 'dateTime' && (
              <>
                <PopupFooterChangeModeButton
                  changeMode={onChangeModeButtonClicked}
                  mode="minute"
                  name="Minute"
                  title="Mi"
                  icon="time"
                  pickerName={pickerName}
                />
                <PopupFooterChangeModeButton
                  changeMode={onChangeModeButtonClicked}
                  mode="hour"
                  name="Hour"
                  icon="time"
                  title="Hr"
                  pickerName={pickerName}
                />
              </>
            )}

            <PopupFooterChangeModeButton
              changeMode={onChangeModeButtonClicked}
              mode="day"
              name="Day"
              icon="calendar"
              title="Da"
              pickerName={pickerName}
            />
            <PopupFooterChangeModeButton
              changeMode={onChangeModeButtonClicked}
              mode="month"
              name="Month"
              icon="calendar"
              title="Mo"
              pickerName={pickerName}
            />
            <PopupFooterChangeModeButton
              changeMode={onChangeModeButtonClicked}
              mode="year"
              name="Year"
              icon="calendar"
              title="Yr"
              pickerName={pickerName}
            />
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  );
};

PopupFooter.propTypes = {
  inputType: PropTypes.string,
  onChangeModeButtonClicked: PropTypes.func,
  pickerName: PropTypes.string,
};

export default compose(
  withHandlers({
    onChangeModeButtonClicked: ({ switchMode }) => mode => event => {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => {
        switchMode(mode);
      }, 0);
    },
    onClosePopupClicked: ({ closePopup }) => event => {
      event.preventDefault();
      event.stopPropagation();
      closePopup();
    },
  }),
)(PopupFooter);
