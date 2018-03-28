export interface NavigationProps {
  currentPage: string;
  personalLabel: string;
  organizationLabel: string;
  personalPageName: string;
  organizationPageName: string;
  onHomePageSet: () => void;
}