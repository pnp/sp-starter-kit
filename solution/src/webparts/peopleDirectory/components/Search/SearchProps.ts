export interface SearchProps {
    searchQuery: string;
    onSearch: (searchQuery: string) => void;
    onClear: () => void;
}