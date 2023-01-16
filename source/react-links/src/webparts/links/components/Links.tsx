import * as React from 'react';
import styles from './Links.module.scss';
import * as strings from 'LinksWebPartStrings';
import { ILinksProps } from './ILinksProps';
import { ILinksState } from './ILinksState';
import { groupBy, toPairs, sortBy, fromPairs } from '@microsoft/sp-lodash-subset';
import { Link } from '@fluentui/react/lib/Link';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Icon } from '@fluentui/react/lib/Icon';
import { ILink } from '../ILink';

const NO_GROUP_NAME: string = '..NOGROUPNAME..';

export default class Links extends React.Component<ILinksProps, ILinksState> {

  constructor(props: ILinksProps) {
    super(props);

    this.state = {
      groups: undefined
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this._processLinks();
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: ILinksProps, prevState: ILinksState): void {
    if (prevProps.collectionData !== this.props.collectionData) {
      this._processLinks();
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ILinksProps> {
    // Get all group names
    const groupNames: string[] = this.state.groups ? Object.keys(this.state.groups) : undefined;

    return (
      <div className={styles.links}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.fUpdateProperty} />
        {
          (groupNames && groupNames.length > 0) ? (
            <div className={styles.row}>
              {
                groupNames.map((groupName, index) => (
                  <div key={index}>
                    {
                      // Do not show a header for the empty group
                      groupName !== NO_GROUP_NAME && (
                        <div className={`${styles.column} ${styles.groupName}`}>
                          <span>{groupName}</span>
                        </div>
                      )
                    }
                    {
                      // Loop over all links per group
                      sortBy(this.state.groups[groupName], (link: { title: string; }) => link.title.toLowerCase()).map((link: { title: string; url: string; target: string; icon: string; }, index: React.Key) => (
                        <div key={index} className={`${styles.column} ${styles.link}`}>
                          <Link title={link.title} href={link.url} target={link.target}>
                            {
                              link.icon && <Icon className={styles.icon} iconName={link.icon} />
                            }
                            {link.title}
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          ) : (
              <Placeholder
                iconName='Edit'
                iconText={strings.noLinksIconText}
                description={strings.noLinksConfigured}
                buttonLabel={strings.noLinksBtn}
                onConfigure={this.props.fPropertyPaneOpen} />
            )
        }
      </div>
    );
  }

  /**
   * Process all links from the collection data
   */
  private _processLinks(): void {
    const { collectionData } = this.props;
    if (collectionData && collectionData.length > 0) {
      // Group by the group name
      let groups: _.Dictionary<ILink[]> = groupBy(collectionData, link => link.group ? link.group : NO_GROUP_NAME);
      // Sort the group by the property name
      groups = fromPairs(sortBy(toPairs(groups), 0));
      this.setState({
        groups
      });
    } else {
      this.setState({
        groups: undefined
      });
    }
  }
}
