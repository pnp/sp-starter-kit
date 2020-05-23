import * as React from 'react';

import { IDateTimePickerProps } from './IDateTimePickerProps';
import { IDateTimePickerState } from './IDateTimePickerState';

/**
 * Common Infrastructure
 */
import {
  BaseComponent,
  assign
} from 'office-ui-fabric-react/lib/Utilities';

/**
 * Label
 */
import { Label } from 'office-ui-fabric-react/lib/Label';

/**
 * Text Field
 */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

/**
 * Date Picker
 */
import {
  DatePicker,
  DayOfWeek,
  IDatePickerStrings
} from 'office-ui-fabric-react/lib/DatePicker';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
  ],

  goToToday: 'Go to today',
  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

export interface IDatePickerRequiredExampleState {
  firstDayOfWeek?: DayOfWeek;
}

export class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {

    /**
     * Constructor
     */
    constructor(props: IDateTimePickerProps) {
        super(props);

        this.state = {
            date: (this.props.initialDateTime != null) ? this.props.initialDateTime : null,
            hours: (this.props.initialDateTime != null) ? this.props.initialDateTime.getHours() : 0,
            minutes: (this.props.initialDateTime != null) ? this.props.initialDateTime.getMinutes() : 0,
            seconds: (this.props.initialDateTime != null) ? this.props.initialDateTime.getSeconds() : 0,
        };
    }

  public render(): React.ReactElement<IDateTimePickerProps> {
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className={ (this.props.showTime) ? "ms-Grid-col ms-u-sm6 ms-u-md6 ms-u-lg6" : "ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12" }>
                    <DatePicker
                        value={ this.state.date }
                        onSelectDate={ this._dateSelected }
                        label={ this.props.dateLabel }
                        isRequired={ this.props.isRequired }
                        firstDayOfWeek={ DayOfWeek.Sunday }
                        strings={ DayPickerStrings }
                        placeholder={ this.props.datePlaceholder } />
                </div>
                { (this.props.showTime) ?
                    <div className={ (this.props.includeSeconds) ? "ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2" : "ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3" }>
                        <TextField
                          type="number"
                          label={ this.props.hoursLabel }
                          onChange={ this._hoursChanged }
                          onGetErrorMessage={ this._getErrorMessageHours }
                          min="0" 
                          max="23" />
                    </div>
                    : null
                }
                { (this.props.showTime) ?
                    <div className={ (this.props.includeSeconds) ? "ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2" : "ms-Grid-col ms-u-sm3 ms-u-md3 ms-u-lg3" }>
                        <TextField
                          type="number"
                          label={ this.props.minutesLabel }
                          onChange={ this._minutesChanged }
                          onGetErrorMessage={ this._getErrorMessageMinutes }
                          min="0" 
                          max="59" />
                    </div>
                    : null
                }
                { (this.props.showTime && this.props.includeSeconds) ?
                    <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2">
                        <TextField
                          type="number"
                          label={ this.props.secondsLabel }
                          onChange={ this._secondsChanged }
                          onGetErrorMessage={ this._getErrorMessageSeconds }
                          min="0"
                          max="59" />
                    </div>
                    : null
                }
            </div>
        </div>
    );
  }

  private _dateSelected = (date: Date): void => {
    if (date == null) {
      return;
    }

    this.setState({
      date: date
    }, () => { this.saveFullDate(); });
  }

  private _hoursChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string): void => {
    this.setState({
      hours: Number(value)
    }, () => { this.saveFullDate(); });
  }

  private _getErrorMessageHours = (value: string): string => {
    let hoursValue: Number = Number(value);
    return (hoursValue >= 0 && hoursValue <= 23)
      ? ''
      : `${this.props.hoursValidationError}.`;
  }

private _minutesChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    this.setState({
      minutes: Number(newValue)
    }, () => { this.saveFullDate(); });
  }

  private _getErrorMessageMinutes = (value: string): string => {
    let minutesValue: Number = Number(value);
    return (minutesValue >= 0 && minutesValue <= 59)
      ? ''
      : `${this.props.minutesValidationError}.`;
  }

  private _secondsChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    this.setState({
      seconds: Number(newValue)
    }, () => { this.saveFullDate(); });
  }

  private _getErrorMessageSeconds = (value: string): string => {
    let secondsValue: Number = Number(value);
    return (secondsValue >= 0 && secondsValue <= 59)
      ? ''
      : `${this.props.secondsValidationError}.`;
  }

  private saveFullDate(): void {
    if (this.state.date == null) {
      return;
    }
    var finalDate: Date = new Date(this.state.date.toISOString());
    finalDate.setHours(this.state.hours);
    finalDate.setMinutes(this.state.minutes);
    finalDate.setSeconds(this.props.includeSeconds ? this.state.seconds : 0);

    if (finalDate != null) {
      var finalDateAsString: string = '';
      if (this.props.formatDate) {
        finalDateAsString = this.props.formatDate(finalDate);
      } else {
        finalDateAsString = finalDate.toString();
      }
    }

    this.setState({
      fullDate: finalDateAsString
    });

    if (this.props.onChanged != null) {
      this.props.onChanged(finalDate);
    }
  }
}