import * as React from 'react';
import { NavigationProps, NavigationState } from '.';
import styles from './Navigation.module.scss';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export class Navigation extends React.Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);

    this.state = {
      homeButtonIcon: 'Home'
    };
  }

  public render(): React.ReactElement<NavigationProps> {
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
          disabled={!this.canSetHomePage()}
          iconProps={{iconName: this.state.homeButtonIcon}}
          title='Set this page as your home page'
          className={styles.buttonIcon}
          onClick={this.handleHomePageSet.bind(this)}
        />
      </div>
    );
  }

  private handleHomePageSet(): void {
    this.props.onHomePageSet();
    this.setState({
      homeButtonIcon: 'CheckMark'
    });
  }

  /**
   * Set as home page button is enabled only when user is on the Personal
   * or Organization page.
   */
  private canSetHomePage(): boolean {
    return this.props.currentPage !== '';
  }
}
