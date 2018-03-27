import { Person } from "../PeopleDirectory";

export interface PeopleListProps {
    people: Person[];
    selectedIndex: string;
    hasSearchQuery: boolean;
}