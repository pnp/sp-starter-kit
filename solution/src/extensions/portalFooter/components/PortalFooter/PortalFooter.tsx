import * as React from 'react';
import { IPortalFooterProps, IPortalFooterState } from '.';
import styles from './PortalFooter.module.scss';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Links } from '../Links';
import * as strings from 'PortalFooterApplicationCustomizerStrings';
import { ILinkGroup } from '../../../../../lib/extensions/portalFooter/components/PortalFooter';

export class PortalFooter extends React.Component<IPortalFooterProps, IPortalFooterState> {
  constructor(props: IPortalFooterProps) {
    super(props);

    this.state = {
      expanded: false,
      toggleButtonIconName: 'DoubleChevronUp',
      loadingLinks: false,
      links: [
        {
          title: 'Lorem ipsum 1',
          links: [
            {
              title: 'Lorem ipsum',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor sit amet',
              url: '#'
            },
            {
              title: 'Lorem',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor',
              url: '#'
            },
            {
              title: 'Lorem ipsum',
              url: '#'
            }
          ]
        },
        {
          title: 'Lorem ipsum 2',
          links: [
            {
              title: 'Lorem ipsum',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor sit amet',
              url: '#'
            },
            {
              title: 'Lorem',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor',
              url: '#'
            },
            {
              title: 'Lorem ipsum',
              url: '#'
            }
          ]
        },
        {
          title: 'Lorem ipsum 3',
          links: [
            {
              title: 'Lorem ipsum',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor sit amet',
              url: '#'
            },
            {
              title: 'Lorem',
              url: '#'
            },
            {
              title: 'Lorem ipsum dolor',
              url: '#'
            },
            {
              title: 'Lorem ipsum',
              url: '#'
            }
          ]
        }
      ]
    };
  }

  private _handleToggle = (): void => {
    const wasExpanded: boolean = this.state.expanded;

    this.setState({
      expanded: !wasExpanded,
      toggleButtonIconName: wasExpanded ? 'DoubleChevronUp' : 'DoubleChevronDown'
    });
  }

  private _handleLinksEdit = (selectedLinks: ILinkGroup[]): void => {
    // todo: save links in the user profile
    // todo: update cache
    this.setState({
      links: selectedLinks
    });
  }

  public render(): React.ReactElement<IPortalFooterProps> {
    return (
      <div className={styles.portalFooter}>
        <Links links={this.state.links} loadingLinks={this.state.loadingLinks} visible={this.state.expanded} onLinksEdit={this._handleLinksEdit} />
        <div className={styles.main}>
          <div className="ms-Grid">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm3">
                <Label className={styles.copyright}>{strings.Copyright}</Label>
              </div>
              <div className="ms-Grid-col ms-sm2">
                <ActionButton
                  iconProps={{ iconName: 'Headset' }}
                  className={styles.supportButton}
                  href='/'>
                  {strings.Support}
                </ActionButton>
              </div>
              <div className="ms-Grid-col ms-sm6"></div>
              <div className="ms-Grid-col ms-sm1">
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
