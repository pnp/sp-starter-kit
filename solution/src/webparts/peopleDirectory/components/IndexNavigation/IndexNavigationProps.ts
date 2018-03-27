export interface IndexNavigationProps {
    selectedIndex: string;
    searchQuery: string;
    onIndexSelect: (index: string) => void;
    onSearch: (searchQuery: string) => void;
    onSearchClear: () => void;
}