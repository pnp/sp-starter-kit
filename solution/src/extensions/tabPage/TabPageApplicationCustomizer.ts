import { override } from '@microsoft/decorators';
import React = require('react');
import ReactDom = require('react-dom');
import {
  PlaceholderContent,
  BaseApplicationCustomizer,
  PlaceholderName,
} from '@microsoft/sp-application-base';
import * as strings from 'TabPageApplicationCustomizerStrings';
import {
  NavigationProps,
  Navigation
} from './components';

export interface ITabPageApplicationCustomizerProperties {
  personalPageName: string;
  organizationPageName: string;
}

export default class TabPageApplicationCustomizer extends BaseApplicationCustomizer<ITabPageApplicationCustomizerProperties> {
  private static topPlaceholder?: PlaceholderContent;
  private static readonly storageKey: string = 'pnpTabPage_HomePage';

  @override
  public onInit(): Promise<void> {
    this.context.application.navigatedEvent.add(this, this.render);

    return Promise.resolve();
  }

  private render(): void {
    if (!TabPageApplicationCustomizer.topPlaceholder) {
      TabPageApplicationCustomizer.topPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Top, { onDispose: this.handleDispose });
    }

    if (!TabPageApplicationCustomizer.topPlaceholder) {
      return;
    }

    const element: React.ReactElement<NavigationProps> = React.createElement(
      Navigation,
      {
        currentPage: this.getHomePageType(),
        personalLabel: strings.Personal,
        organizationLabel: strings.Organization,
        personalPageName: this.properties.personalPageName,
        organizationPageName: this.properties.organizationPageName,
        onHomePageSet: this.handleHomePageSet.bind(this)
      }
    );

    ReactDom.render(element, TabPageApplicationCustomizer.topPlaceholder.domElement);

    this.redirectIfOnSiteRoot();
  }

  private handleDispose(): void {
  }

  /**
   * Compares the name of the currently requested page with the configured
   * personal and organization pages and returns page type.
   */
  private getHomePageType(): string {
    const pageName: string = this.getCurrentPageName();
    switch (pageName) {
      case this.properties.personalPageName:
        return strings.Personal;
      case this.properties.organizationPageName:
        return strings.Organization;
      default:
        return '';
    }
  }

  /**
   * Redirects to the page configured for the given page type.
   * 
   * @param newPage Type of page to redirect to. Redirects to the URL configured for the given page type
   */
  private handlePageSelect(newPage: string): void {
    let pageName: string = '';

    switch (newPage) {
      case strings.Personal:
        pageName = this.properties.personalPageName;
        break;
      case strings.Organization:
        pageName = this.properties.organizationPageName;
        break;
    }

    const pageUrl: string = `${this.context.pageContext.list.serverRelativeUrl}/${pageName}`;

    location.href = pageUrl;
  }

  /**
   * Stores the current page as the default home page for the user.
   */
  private handleHomePageSet(): void {
    const newHomePage: string = this.getHomePageType();
    localStorage.setItem(TabPageApplicationCustomizer.storageKey, newHomePage);
  }

  /**
   * When user navigates to the site's root, without selecting a page, redirects to the selected home page.
   */
  private redirectIfOnSiteRoot(): void {
    if (location.pathname.indexOf('.aspx') < 0) {
      let preferredHomePage = localStorage.getItem(TabPageApplicationCustomizer.storageKey);
      if (!preferredHomePage) {
        preferredHomePage = strings.Organization;
      }

      this.handlePageSelect(preferredHomePage);
    }
  }

  /**
   * Gets the name of the current page from the server-relative URL
   */
  private getCurrentPageName(): string {
    const serverRelativePageUrl: string = this.context.pageContext.legacyPageContext.serverRequestPath;
    const pageName: string = serverRelativePageUrl.substr(serverRelativePageUrl.lastIndexOf('/') + 1).toLowerCase();

    return pageName;
  }
}
