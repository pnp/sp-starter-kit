import * as React from 'react';
import { IPortalFooterProps, IPortalFooterState } from '.';
import styles from './PortalFooter.module.scss';
import {
  CommandBar,
  IContextualMenuItem,
  DefaultButton,
  ActionButton,
  Label,
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react';
import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { ILinkGroup } from './ILinkGroup';
import { Links } from '../Links';
import { IPortalFooterEditResult } from '../PortalFooter/IPortalFooterEditResult';

export class PortalFooter extends React.Component<IPortalFooterProps, IPortalFooterState> {
  constructor(props: IPortalFooterProps) {
    super(props);

    this.state = {
      expanded: false,
      toggleButtonIconName: 'DoubleChevronUp',
      loadingLinks: false,
      links: props.links,
    };
  }

  private _handleToggle = (): void => {
    const wasExpanded: boolean = this.state.expanded;

    this.setState({
      expanded: !wasExpanded,
      toggleButtonIconName: wasExpanded ? 'DoubleChevronUp' : 'DoubleChevronDown'
    });
  }

  private _handleSupport = (): void => {
    const supportUrl: string = `mailto:${this.props.support}`;
    location.href = supportUrl;
    console.log(supportUrl);
  }

  private _handleLinksEdit = async (): Promise<void> => {

    let editResult: IPortalFooterEditResult = await this.props.onLinksEdit();
    if (editResult != null) {
      this.setState({
        myLinksSaved: editResult.editResult,
        links: editResult.links
      });

      // hide the message after 2 sec
      window.setTimeout(() => {
        this.setState({
          myLinksSaved: null,
        });
      }, 2000);
    }
  }

  public render(): React.ReactElement<IPortalFooterProps> {
    return (
      <div className={styles.portalFooter}>
        {this.state.myLinksSaved != null ? (this.state.myLinksSaved ?
          <MessageBar
            messageBarType={MessageBarType.success}>{strings.MyLinksSaveSuccess}</MessageBar> :
          <MessageBar
            messageBarType={MessageBarType.error}>{strings.MyLinksSaveFailed}</MessageBar>) : null}
        <Links links={this.state.links}
          loadingLinks={this.state.loadingLinks}
          visible={this.state.expanded}
          onMyLinksEdit={this._handleLinksEdit} />
        <div className={styles.main}>
          <div className={styles.linksContainer}>
            <div className={styles.linksContainerRow}>
              <div className={styles.copyrightContainer} onClick={this._handleToggle}>
                <Label className={styles.copyright}>{this.props.copyright}</Label>
              </div>
              <div className={styles.supportButtonContainer}>
                <ActionButton
                  iconProps={{ iconName: 'Headset' }}
                  className={styles.supportButton}
                  onClick={this._handleSupport}>
                  {this.props.support}
                </ActionButton>
              </div>
              <div className={styles.fillerContainer} onClick={this._handleToggle}>
                <Label className={styles.filler}>&nbsp;</Label>
              </div>
              <div className={styles.toggleButtonContainer} onClick={this._handleToggle}>
                <div className={styles.toggleControl}>
                  <DefaultButton
                    iconProps={{ iconName: this.state.toggleButtonIconName }}
                    title={this.state.expanded ? strings.ToggleButtonClose : strings.ToggleButtonOpen}
                    className={styles.toggleButton}
                    onClick={this._handleToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
