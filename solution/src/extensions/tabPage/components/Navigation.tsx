import * as React from 'react';
import { INavigationProps, INavigationState } from '.';
import styles from './Navigation.module.scss';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as strings from 'TabPageApplicationCustomizerStrings';

export class Navigation extends React.Component<INavigationProps, INavigationState> {
  constructor(props: INavigationProps) {
    super(props);

    this.state = {
      homeButtonIcon: 'Home'
    };
  }

  private _handleHomePageSet = (): void => {
    // set the current home page as the preferred home page for the current user
    this.props.onHomePageSet();
    // update button icon to check mark as feedback to the click
    this.setState({
      homeButtonIcon: 'CheckMark'
    });
  }

  /**
   * Set as home page button is enabled only when user is on the Personal
   * or Organization page. If the user is on a page different than the
   * Personal or Organization page, the value of the this.props.currentPage
   * property is empty.
   */
  private _canSetHomePage(): boolean {
    return this.props.currentPage !== '';
  }

  public render(): React.ReactElement<INavigationProps> {
    return (
      <div className={styles.navigation}>
        <DefaultButton
          href={this.props.personalPageName}
          primary={this.props.personalLabel === this.props.currentPage}
          text={this.props.personalLabel}
          data-link={this.props.personalLabel}
        />
        <DefaultButton
          href={this.props.organizationPageName}
          primary={this.props.organizationLabel === this.props.currentPage}
          text={this.props.organizationLabel}
          data-link={this.props.organizationLabel}
        />
        <DefaultButton
          // only the personal or the organization home page can be set
          // as home page
          disabled={!this._canSetHomePage()}
          iconProps={{iconName: this.state.homeButtonIcon}}
          title={strings.SetPageAsHomePageTitle}
          className={styles.buttonIcon}
          onClick={this._handleHomePageSet}
        />
      </div>
    );
  }
}
