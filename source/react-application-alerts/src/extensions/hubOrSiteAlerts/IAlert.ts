/**
 * Interface that represents an alert item
 */
export interface IAlert {
  message: string;
  moreInformationUrl: string;
  type: AlertType;
}

export enum AlertType {
  Information = 1,
  Urgent
}

/**
 * Interface that represents a list item with alert information
 */
export interface IAlertItem {
  PnPAlertEndDateTime: string;
  PnPAlertMessage: string;
  PnPAlertMoreInformation: {
    Description: string;
    Url: string;
  };
  PnPAlertStartDateTime: string;
  PnPAlertType: string;
}