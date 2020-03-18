export interface IDateTimePickerProps {
    dateLabel: string;
    datePlaceholder?: string;
    hoursLabel?: string;
    hoursValidationError?: string;
    minutesLabel?: string;
    minutesValidationError?: string;
    secondsLabel?: string;
    secondsValidationError?: string;
    isRequired: boolean;
    initialDateTime?: Date;
    showTime?: boolean;
    includeSeconds?: boolean;
    formatDate?: (date: Date) => string;

    onChanged?: (newValue: Date) => void;
}