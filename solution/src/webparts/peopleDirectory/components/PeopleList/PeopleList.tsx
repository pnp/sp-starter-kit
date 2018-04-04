import * as React from 'react';
import { IPeopleListProps } from '.';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/Persona';
import * as strings from 'PeopleDirectoryWebPartStrings';

export class PeopleList extends React.Component<IPeopleListProps, {}> {
  public render(): React.ReactElement<IPeopleListProps> {
    return (
      <div>
        {this.props.people.length === 0 &&
          (this.props.selectedIndex !== 'Search' ||
            (this.props.selectedIndex === 'Search' &&
              this.props.hasSearchQuery)) &&
              // Show the 'No people found' message if no people have been retrieved
              // and the user either selected a letter in the navigation or issued
              // a search query (but not when navigated to the Search tab without
              // providing a query yet)
          <div className='ms-textAlignCenter'>{strings.NoPeopleFoundLabel}</div>}
        {this.props.people.length > 0 &&
          // for each retrieved person, create a persona card with the retrieved
          // information
          this.props.people.map(p => <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={p.phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />)}
      </div>
    );
  }
}
