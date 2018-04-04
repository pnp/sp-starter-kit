import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './PeopleDirectory.module.scss';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import {
  MessageBar,
  MessageBarType
} from 'office-ui-fabric-react/lib/MessageBar';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import {
  PeopleDirectoryProps,
  PeopleDirectoryState,
  PeopleSearchResults,
  Person,
  Cell
} from '.';
import { IndexNavigation } from '../IndexNavigation';
import { PeopleList } from '../PeopleList';

export class PeopleDirectory extends React.Component<PeopleDirectoryProps, PeopleDirectoryState> {
  constructor(props: PeopleDirectoryProps) {
    super(props);

    this.state = {
      loading: false,
      errorMessage: null,
      selectedIndex: 'A',
      searchQuery: '',
      people: []
    };
  }

  public componentDidMount(): void {
    this.loadPeopleInfo(this.state.selectedIndex, null);
  }

  public render(): React.ReactElement<PeopleDirectoryProps> {
    const { loading, errorMessage, selectedIndex, searchQuery, people } = this.state;

    return (
      <div className={styles.peopleDirectory}>
        {!loading &&
          errorMessage &&
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}>Error: {errorMessage}</MessageBar>
        }
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.onTitleUpdate} />
        <IndexNavigation
          selectedIndex={selectedIndex}
          searchQuery={searchQuery}
          onIndexSelect={this.handleIndexSelect}
          onSearch={this.handleSearch}
          onSearchClear={this.handleSearchClear} />
        {loading &&
          <Spinner size={SpinnerSize.large} label='Loading people directory...' />
        }
        {!loading &&
          !errorMessage &&
          <PeopleList
            selectedIndex={selectedIndex}
            hasSearchQuery={searchQuery !== ''}
            people={people} />
        }
      </div>
    );
  }

  private handleIndexSelect = (index: string): void => {
    this.setState({
      selectedIndex: index,
      searchQuery: ''
    });
    this.loadPeopleInfo(index, null);
  }

  private handleSearch = (searchQuery: string): void => {
    this.setState({
      selectedIndex: 'Search',
      searchQuery: searchQuery
    });
    this.loadPeopleInfo(null, searchQuery);
  }

  private handleSearchClear = (): void => {
    this.setState({
      selectedIndex: 'A',
      searchQuery: ''
    });
    this.loadPeopleInfo('A', null);
  }

  private loadPeopleInfo(index: string, searchQuery: string): void {
    this.setState({
      loading: true,
      errorMessage: null,
      people: []
    });

    const headers: HeadersInit = new Headers();
    headers.append("accept", "application/json;odata.metadata=none");

    const query: string = searchQuery === null ? `LastName:${index}*` : searchQuery.replace(/'/g, `''`);

    this.props.spHttpClient
      .get(`${this.props.webUrl}/_api/search/query?querytext='${query}'&selectproperties='PreferredName,WorkEmail,PictureURL,WorkPhone'&sortlist='LastName:ascending'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&rowlimit=500`, SPHttpClient.configurations.v1, {
        headers: headers
      })
      .then((res: SPHttpClientResponse): Promise<PeopleSearchResults> => {
        return res.json();
      })
      .then((res: PeopleSearchResults): void => {
        if (res.error) {
          this.setState({
            loading: false,
            errorMessage: res.error.message
          });
          return;
        }

        if (res.PrimaryQueryResult.RelevantResults.TotalRows == 0) {
          this.setState({
            loading: false
          });
          return;
        }

        const people: Person[] = res.PrimaryQueryResult.RelevantResults.Table.Rows.map(r => {
          return {
            name: this.getValueFromSearchResult('PreferredName', r.Cells),
            phone: this.getValueFromSearchResult('WorkPhone', r.Cells),
            email: this.getValueFromSearchResult('WorkEmail', r.Cells),
            photoUrl: this.getValueFromSearchResult('PictureURL', r.Cells)
          };
        });
        this.setState({
          loading: false,
          people: people
        });
      }, (error: any): void => {
        this.setState({
          loading: false,
          errorMessage: error
        });
      })
      .catch((error: any): void => {
        this.setState({
          loading: false,
          errorMessage: error
        });
      });
  }

  private getValueFromSearchResult(key: string, cells: Cell[]): string {
    for (let i: number = 0; i < cells.length; i++) {
      if (cells[i].Key === key) {
        return cells[i].Value;
      }
    }

    return '';
  }
}
