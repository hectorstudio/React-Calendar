import React from 'react';
import { Popup } from 'semantic-ui-react';

const CustomPopup = props => (
  <Popup
    {...props}
    flowing
    id="suirCalendarPopup"
    on="click"
    className="suir-calendar popup"
  />
);

export default CustomPopup;
export { CustomPopup };
