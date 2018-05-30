declare interface IDiscussNowCommandSetStrings {
  DiscussNowCommand: string;
  
  DiscussNowDialogTitle: string;
  DiscussNowDialogDescription: string;

  ScheduleMeetingSubjectLabel: string;
  ScheduleMeetingSubjectPlaceholder: string;
  ScheduleMeetingSubjectValidationErrorMessage: string;
  ScheduleMeetingDateLabel: string;
  ScheduleMeetingHoursLabel: string;
  ScheduleMeetingHoursValidationError: string;
  ScheduleMeetingMinutesLabel: string;
  ScheduleMeetingMinutesValidationError: string;
  ScheduleMeetingDurationLabel: string;

  ScheduleMeetingOkButtonText: string;
  ScheduleMeetingCancelButtonText: string;
}

declare module 'DiscussNowCommandSetStrings' {
  const strings: IDiscussNowCommandSetStrings;
  export = strings;
}
