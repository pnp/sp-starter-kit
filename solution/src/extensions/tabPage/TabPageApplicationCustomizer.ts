import { override } from '@microsoft/decorators';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  PlaceholderContent,
  BaseApplicationCustomizer,
  PlaceholderName,
} from '@microsoft/sp-application-base';
import * as strings from 'TabPageApplicationCustomizerStrings';
import {
  INavigationProps,
  Navigation
} from './components';

export interface ITabPageApplicationCustomizerProperties {
  /**
   * Name of the modern page in the current site that represents
   * the personal home page, eg. 'personal.aspx'.
   */
  personalPageName: string;
  /**
   * Name of the modern page in the current site that represents
   * the organizational home page, eg. 'home.aspx'.
   */
  organizationPageName: string;
}

export default class TabPageApplicationCustomizer extends BaseApplicationCustomizer<ITabPageApplicationCustomizerProperties> {
  private static _topPlaceholder?: PlaceholderContent;
  private static readonly _storageKey: string = 'pnpTabPage_HomePage';

  private _handleDispose(): void {
  }

  /**
   * Compares the name of the currently requested page with the configured
   * personal and organization pages and returns page type.
   */
  private _getHomePageType(): string {
    const pageName: string = this._getCurrentPageName();
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
  private _handlePageSelect(newPage: string): void {
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
  private _handleHomePageSet = (): void => {
    const newHomePage: string = this._getHomePageType();
    localStorage.setItem(TabPageApplicationCustomizer._storageKey, newHomePage);
  }

  /**
   * When user navigates to the site's root, without selecting a page, redirects to the selected home page.
   */
  private _redirectIfOnSiteRoot(): void {
    if (location.pathname.indexOf('.aspx') < 0) {
      let preferredHomePage = localStorage.getItem(TabPageApplicationCustomizer._storageKey);
      if (!preferredHomePage) {
        preferredHomePage = strings.Organization;
      }

      this._handlePageSelect(preferredHomePage);
    }
  }

  /**
   * Gets the name of the current page from the server-relative URL
   */
  private _getCurrentPageName(): string {
    const serverRelativePageUrl: string = this.context.pageContext.legacyPageContext.serverRequestPath;
    const pageName: string = serverRelativePageUrl.substr(serverRelativePageUrl.lastIndexOf('/') + 1).toLowerCase();

    return pageName;
  }

  @override
  public onInit(): Promise<void> {
    // add handler to he page navigated event which occurs both when
    // the user opens and leaves the page
    this.context.application.navigatedEvent.add(this, this._render);

    return Promise.resolve();
  }

  private _render(): void {
    // check if the application customizer has already been rendered
    if (!TabPageApplicationCustomizer._topPlaceholder) {
      // create a DOM element in the top placeholder for the application customizer
      // to render
      TabPageApplicationCustomizer._topPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Top, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!TabPageApplicationCustomizer._topPlaceholder) {
      return;
    }

    const element: React.ReactElement<INavigationProps> = React.createElement(
      Navigation,
      {
        currentPage: this._getHomePageType(),
        personalLabel: strings.Personal,
        organizationLabel: strings.Organization,
        personalPageName: this.properties.personalPageName,
        organizationPageName: this.properties.organizationPageName,
        onHomePageSet: this._handleHomePageSet
      }
    );

    // render the UI using a React component
    ReactDom.render(element, TabPageApplicationCustomizer._topPlaceholder.domElement);

    // if the user requested the site without a specific page, redirect to the
    // preferred home page. This must be done after rendering, to be able to support
    // partial redirects in the future
    this._redirectIfOnSiteRoot();
  }
}
