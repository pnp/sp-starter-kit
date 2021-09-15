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
  IPeopleDirectoryProps,
  IPeopleDirectoryState,
  IPeopleSearchResults,
  IPerson,
  ICell
} from '.';
import { IndexNavigation } from '../IndexNavigation';
import { PeopleList } from '../PeopleList';
import * as strings from 'PeopleDirectoryWebPartStrings';

export class PeopleDirectory extends React.Component<IPeopleDirectoryProps, IPeopleDirectoryState> {
  constructor(props: IPeopleDirectoryProps) {
    super(props);

    this.state = {
      loading: false,
      errorMessage: null,
      selectedIndex: 'A',
      searchQuery: '',
      people: []
    };
  }

  private _handleIndexSelect = (index: string): void => {
    // switch the current tab to the tab selected in the navigation
    // and reset the search query
    this.setState({
      selectedIndex: index,
      searchQuery: ''
    },
      function () {
        // load information about people matching the selected tab
        this._loadPeopleInfo(index, null);
      });

  }

  private _handleSearch = (searchQuery: string): void => {
    // activate the Search tab in the navigation and set the
    // specified text as the current search query
    this.setState({
      selectedIndex: 'Search',
      searchQuery: searchQuery
    },
      function () {
        // load information about people matching the specified search query
        this._loadPeopleInfo(null, searchQuery);
      });

  }

  private _handleSearchClear = (): void => {
    // activate the A tab in the navigation and clear the previous search query
    this.setState({
      selectedIndex: 'A',
      searchQuery: ''
    },
      function () {
        // load information about people whose last name begins with A
        this._loadPeopleInfo('A', null);
      });
  }

  /**
   * Loads information about people using SharePoint Search
   * @param index Selected tab in the index navigation or 'Search', if the user is searching
   * @param searchQuery Current search query or empty string if not searching
   */
  private _loadPeopleInfo(index: string, searchQuery: string): void {
    // update the UI notifying the user that the component will now load its data
    // clear any previously set error message and retrieved list of people
    this.setState({
      loading: true,
      errorMessage: null,
      people: []
    });

    const headers: HeadersInit = new Headers();
    // suppress metadata to minimize the amount of data loaded from SharePoint
    headers.append("accept", "application/json;odata.metadata=none");

    // if no search query has been specified, retrieve people whose last name begins with the
    // specified letter. if a search query has been specified, escape any ' (single quotes)
    // by replacing them with two '' (single quotes). Without this, the search query would fail
    const query: string = searchQuery === null || searchQuery.length <= 0 ? `LastName:${index}*` : searchQuery.replace(/'/g, `''`);

    // retrieve information about people using SharePoint People Search
    // sort results ascending by the last name
    this.props.spHttpClient
      .get(`${this.props.webUrl}/_api/search/query?querytext='${query}'&selectproperties='FirstName,LastName,PreferredName,WorkEmail,PictureURL,WorkPhone,MobilePhone,JobTitle,Department,Skills,PastProjects'&sortlist='LastName:ascending'&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'&rowlimit=500`, SPHttpClient.configurations.v1, {
        headers: headers
      })
      .then((res: SPHttpClientResponse): Promise<IPeopleSearchResults> => {
        return res.json();
      })
      .then((res: IPeopleSearchResults): void => {
        if (res.error) {
          // There was an error loading information about people.
          // Notify the user that loading data is finished and return the
          // error message that occurred
          this.setState({
            loading: false,
            errorMessage: res.error.message
          });
          return;
        }

        if (res.PrimaryQueryResult.RelevantResults.TotalRows == 0) {
          // No results were found. Notify the user that loading data is finished
          this.setState({
            loading: false
          });
          return;
        }

        // convert the SharePoint People Search results to an array of people
        let people: IPerson[] = res.PrimaryQueryResult.RelevantResults.Table.Rows.map(r => {
          return {
            name: this._getValueFromSearchResult('PreferredName', r.Cells),
            firstName: this._getValueFromSearchResult('FirstName', r.Cells),
            lastName: this._getValueFromSearchResult('LastName', r.Cells),
            phone: this._getValueFromSearchResult('WorkPhone', r.Cells),
            mobile: this._getValueFromSearchResult('MobilePhone', r.Cells),
            email: this._getValueFromSearchResult('WorkEmail', r.Cells),
            photoUrl: `${this.props.webUrl}${"/_layouts/15/userphoto.aspx?size=M&accountname=" + this._getValueFromSearchResult('WorkEmail', r.Cells)}`,
            function: this._getValueFromSearchResult('JobTitle', r.Cells),
            department: this._getValueFromSearchResult('Department', r.Cells),
            skills: this._getValueFromSearchResult('Skills', r.Cells),
            projects: this._getValueFromSearchResult('PastProjects', r.Cells)
          };
        });

        const selectedIndex = this.state.selectedIndex;

        if (this.state.searchQuery === '') {
          // An Index is used to search people.
          //Reduce the people collection if the first letter of the lastName of the person is not equal to the selected index
          people = people.reduce((result: IPerson[], person: IPerson) => {
            if (person.lastName && person.lastName.indexOf(selectedIndex) === 0) {
              result.push(person);
            }
            return result;
          }, []);
        }

        if (people.length > 0) {
          // notify the user that loading the data is finished and return the loaded information
          this.setState({
            loading: false,
            people: people
          });
        }
        else {
          // People collection could be reduced to zero, so no results
          this.setState({
            loading: false
          });
          return;
        }
      }, (error: any): void => {
        // An error has occurred while loading the data. Notify the user
        // that loading data is finished and return the error message.
        this.setState({
          loading: false,
          errorMessage: error
        });
      })
      .catch((error: any): void => {
        // An exception has occurred while loading the data. Notify the user
        // that loading data is finished and return the exception.
        this.setState({
          loading: false,
          errorMessage: error
        });
      });
  }

  /**
   * Retrieves the value of the particular managed property for the current search result.
   * If the property is not found, returns an empty string.
   * @param key Name of the managed property to retrieve from the search result
   * @param cells The array of cells for the current search result
   */
  private _getValueFromSearchResult(key: string, cells: ICell[]): string {
    for (let i: number = 0; i < cells.length; i++) {
      if (cells[i].Key === key) {
        return cells[i].Value;
      }
    }

    return '';
  }

  public componentDidMount(): void {
    // load information about people after the component has been
    // initiated on the page
    this._loadPeopleInfo(this.state.selectedIndex, null);
  }

  public render(): React.ReactElement<IPeopleDirectoryProps> {
    const { loading, errorMessage, selectedIndex, searchQuery, people } = this.state;

    return (
      <div className={styles.peopleDirectory}>
        {!loading &&
          errorMessage &&
          // if the component is not loading data anymore and an error message
          // has been returned, display the error message to the user
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}>{strings.ErrorLabel}: {errorMessage}</MessageBar>
        }
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.onTitleUpdate} />
        <IndexNavigation
          selectedIndex={selectedIndex}
          searchQuery={searchQuery}
          onIndexSelect={this._handleIndexSelect}
          onSearch={this._handleSearch}
          onSearchClear={this._handleSearchClear}
          locale={this.props.locale} />
        {loading &&
          // if the component is loading its data, show the spinner
          <Spinner size={SpinnerSize.large} label={strings.LoadingSpinnerLabel} />
        }
        {!loading &&
          !errorMessage &&
          // if the component is not loading data anymore and no errors have occurred
          // render the list of retrieved people
          <PeopleList
            selectedIndex={selectedIndex}
            hasSearchQuery={searchQuery !== ''}
            people={people} />
        }
      </div>
    );
  }
}
