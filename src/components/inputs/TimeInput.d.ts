import * as React from 'react';

export interface TimeInputProps {
    [key: string]: any;

    /**
     * Called when the user attempts to change the value.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: (event: React.SyntheticEvent<HTMLInputElement>, data: TimeInputData) => void;

    /** Shorthand for Icon. */
    icon?: any;

    /** Position for the popup. */
    popupPosition?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | 'right center' | 'left center' | 'top center' | 'bottom center';

    /** A time input can be formatted to appear inline in other content. */
    inline?: boolean;

    /** Field's name by which `onChange` handler identifies the field. */
    name?: string;
}

export interface TimeInputData extends TimeInputProps {
    value: string;
    name: string;
}

declare class TimeInput extends React.Component<TimeInputProps, {}> {
}

export default TimeInput;
