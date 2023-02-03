import * as React from 'react';
import { IAlertNotificationsProps } from '.';
import * as strings from 'HubOrSiteAlertsApplicationCustomizerStrings';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { AlertType } from '../IAlert';

export class AlertNotifications extends React.Component<IAlertNotificationsProps, {}> {
  public render(): React.ReactElement<IAlertNotificationsProps> {
    return (
      <div>
        {this.props.alerts.map(alert => <MessageBar
          messageBarType={alert.type === AlertType.Urgent ? MessageBarType.severeWarning : MessageBarType.warning}
          isMultiline={false}
        >
          {alert.message}
          {alert.moreInformationUrl ? <a href={alert.moreInformationUrl}>{strings.MoreInformation}</a> : ''}
        </MessageBar>)}
      </div>
    );
  }
}
