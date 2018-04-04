import { IPerson } from "../PeopleDirectory";

/**
 * Properties for the people list component
 */
export interface IPeopleListProps {
  /**
   * Array of people matching the selected tab or the current search query
   */
  people: IPerson[];
  /**
   * Currently selected tab, eg. 'A'
   */
  selectedIndex: string;
  /**
   * True if the user is searching for people
   */
  hasSearchQuery: boolean;
}