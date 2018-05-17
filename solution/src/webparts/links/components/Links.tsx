import * as React from 'react';
import styles from './Links.module.scss';
import * as strings from 'LinksWebPartStrings';
import { ILinksProps } from './ILinksProps';
import { ILinksState } from './ILinksState';
import { escape, groupBy, toPairs, sortBy, fromPairs } from '@microsoft/sp-lodash-subset';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ILink } from './ILink';

const NO_GROUP_NAME = "..NOGROUPNAME..";

export default class Links extends React.Component<ILinksProps, ILinksState> {

  constructor(props: ILinksProps) {
    super(props);

    this.state = {
      groups: null
    };
  }

  /**
   * Process all links from the collection data
   */
  private _processLinks(): void {
    const {collectionData} = this.props;
    if (collectionData && collectionData.length > 0) {
      // Group by the group name
      let groups = groupBy(collectionData, link => link.group ? link.group : NO_GROUP_NAME);
      // Sort the group by the property name
      groups = fromPairs(sortBy(toPairs(groups), 0));

      this.setState({
        groups
      });
    } else {
      this.setState({
        groups: null
      });
    }
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
    const groupNames = this.state.groups ? Object.keys(this.state.groups) : null;

    return (
      <div className={styles.links}>
        <WebPartTitle displayMode={this.props.displayMode}
                      title={this.props.title}
                      updateProperty={this.props.fUpdateProperty} />
        {
          (groupNames && groupNames.length > 0) ? (
            <div className={styles.row}>
            {
              groupNames.map(groupName => (
                <div>
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
                    sortBy(this.state.groups[groupName], link => link.title.toLowerCase()).map(link => (
                      <div className={`${styles.column} ${styles.link}`}>
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
}
