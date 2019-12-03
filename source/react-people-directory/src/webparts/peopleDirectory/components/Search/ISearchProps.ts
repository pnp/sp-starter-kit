/**
 * Properties for the search component
 */
export interface ISearchProps {
  /**
   * Current search query
   */
  searchQuery: string;
  /**
   * Event handler for issuing a search query
   */
  onSearch: (searchQuery: string) => void;
  /**
   * Event handler for clearing the current search query
   */
  onClear: () => void;
}