import { Person } from ".";

export interface PeopleDirectoryState {
    loading: boolean;
    errorMessage: string;
    selectedIndex: string;
    searchQuery: string;
    people: Person[];
}