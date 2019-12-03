import { IPerson } from ".";

/**
 * State for the people directory component
 */
export interface IPeopleDirectoryState {
    /**
     * True if the component is loading its data, false otherwise
     */
    loading: boolean;
    /**
     * Contains the error message that occurred while loading the data.
     * If no error message occurred, null.
     */
    errorMessage: string;
    /**
     * Currently selected tab, eg. 'A'
     */
    selectedIndex: string;
    /**
     * Current search query. Empty string if no search query has been issued
     */
    searchQuery: string;
    /**
     * List of people matching either the currently selected tab or the
     * search query. Empty array if no matching people found.
     */
    people: IPerson[];
}