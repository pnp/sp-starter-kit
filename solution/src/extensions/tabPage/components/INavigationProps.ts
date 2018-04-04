/**
 * Properties for the navigation component
 */
export interface INavigationProps {
  /**
   * Type of the current page. 
   */
  currentPage: string;
  /**
   * Display label for the personal home page
   */
  personalLabel: string;
  /**
   * Display label for the organizational home page
   */
  organizationLabel: string;
  /**
   * Name of the page in the current site that represents the
   * personal home page, eg. 'personal.aspx'
   */
  personalPageName: string;
  /**
   * Name of the page in the current site that represents the
   * organizational home page, eg. 'home.aspx'
   */
  organizationPageName: string;
  /**
   * Event handler for selecting a page in the navigation
   */
  onHomePageSet: () => void;
}