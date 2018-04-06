import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import * as strings from 'RecentlyVisitedSitesWebPartStrings';
import { RecentlyVisitedSites, IRecentlyVisitedSitesProps } from './components';

export interface IRecentlyVisitedSitesWebPartProps {
  title: string;
}

export default class RecentlyVisitedSitesWebPart extends BaseClientSideWebPart<IRecentlyVisitedSitesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecentlyVisitedSitesProps> = React.createElement(
      RecentlyVisitedSites,
      {
        title: this.properties.title,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
