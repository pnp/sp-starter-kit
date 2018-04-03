import * as React from 'react';
import styles from './Search.module.scss';
import { SearchProps } from '.';
import {
  SearchBox
} from 'office-ui-fabric-react/lib/SearchBox';

export class Search extends React.Component<SearchProps, {}> {
  public render(): React.ReactElement<SearchProps> {
    return (
      <div className={styles.search}>
        <SearchBox
          placeholder='Search'
          onSearch={this.handleSearch}
          onClear={this.handleClear}
          value={this.props.searchQuery}
          className={styles.searchBox}
        />
      </div>
    );
  }

  private handleSearch = (searchQuery: string): void => {
    this.props.onSearch(searchQuery);
  }

  private handleClear = (): void => {
    this.props.onClear();
  }
}
