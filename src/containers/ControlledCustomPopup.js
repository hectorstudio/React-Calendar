import React from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function ControlledCustomPopup(props) {
  const { popupState, handleClose, handleOpen } = props;
  const passProp = { ...props };
  delete passProp.popupState;
  delete passProp.handleClose;
  delete passProp.handleOpen;
  return (
    <Popup
      {...passProp}
      flowing
      id="suirCalendarPopup"
      // hideOnScroll
      open={popupState}
      on="click"
      onClose={handleClose}
      onOpen={handleOpen}
      className="suir-calendar popup"
      // hoverable
    />
  );
}

ControlledCustomPopup.propTypes = {
  popupState: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ControlledCustomPopup;
export { ControlledCustomPopup };
