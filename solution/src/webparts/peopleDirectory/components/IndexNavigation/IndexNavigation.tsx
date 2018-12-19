import * as React from 'react';
import styles from './IndexNavigation.module.scss';
import { IIndexNavigationProps } from '.';
import { Search } from '../Search';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as strings from 'PeopleDirectoryWebPartStrings';

export class IndexNavigation extends React.Component<IIndexNavigationProps, {}> {
  /**
   * Event handler for selecting a tab in the navigation
   */
  private _handleIndexSelect = (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>): void => {
    this.props.onIndexSelect(item.props.linkText);
  }

  public shouldComponentUpdate(nextProps: IIndexNavigationProps, nextState: {}, nextContext: any): boolean {
    // Component should update only if the selected tab has changed.
    // This check helps to avoid unnecessary renders
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  public render(): React.ReactElement<IIndexNavigationProps> {
    // build the list of alphabet letters A..Z
    const az = Array.apply(null, { length: 26 }).map((x: string, i: number): string => { return String.fromCharCode(65 + i); });
    if (this.props.locale === "sv-SE") {
      az.push('Å', 'Ä', 'Ö');
    }
    // for each letter, create a PivotItem component
    const indexes: JSX.Element[] = az.map(index => <PivotItem linkText={index} itemKey={index} key={index} />);
    // as the last tab in the navigation, add the Search option
    indexes.push(<PivotItem linkText={strings.SearchButtonText} itemKey='Search'>
      <Search
        searchQuery={this.props.searchQuery}
        onSearch={this.props.onSearch}
        onClear={this.props.onSearchClear} />
    </PivotItem>);

    return (
      <div className={styles.indexNavigation}>
        <Pivot onLinkClick={this._handleIndexSelect} selectedKey={this.props.selectedIndex}>
          {indexes}
        </Pivot>
      </div>
    );
  }
}
