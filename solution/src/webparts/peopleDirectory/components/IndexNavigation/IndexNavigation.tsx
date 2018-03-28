import * as React from 'react';
import styles from './IndexNavigation.module.scss';
import { IndexNavigationProps } from '.';
import { Search } from '../Search';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export class IndexNavigation extends React.Component<IndexNavigationProps, {}> {
  public render(): React.ReactElement<IndexNavigationProps> {
    const az = Array.apply(null, { length: 26 }).map((x: string, i: number): string => { return String.fromCharCode(65 + i); });
    const indexes: JSX.Element[] = az.map(index => <PivotItem linkText={index} itemKey={index} key={index} />);
    indexes.push(<PivotItem linkText='Search' itemKey='Search'>
      <Search
        searchQuery={this.props.searchQuery}
        onSearch={this.props.onSearch}
        onClear={this.props.onSearchClear} />
    </PivotItem>);

    return (
      <div className={styles.indexNavigation}>
        <Pivot onLinkClick={this.handleIndexSelect.bind(this)} selectedKey={this.props.selectedIndex}>
          {indexes}
        </Pivot>
      </div>
    );
  }

  private handleIndexSelect(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>): void {
    this.props.onIndexSelect(item.props.linkText);
  }
}
