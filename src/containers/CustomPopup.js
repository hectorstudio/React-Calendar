import React from 'react';
import { Popup } from 'semantic-ui-react';

const CustomPopup = props => (
  <Popup
    {...props}
    flowing
    id="suirCalendarPopup"
    hideOnScroll
    on="click"
    className="suir-calendar popup"
    hoverable
  />
);

export default CustomPopup;
export { CustomPopup };
