import * as React from 'react';
import { PeopleListProps } from '.';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/Persona';

export class PeopleList extends React.Component<PeopleListProps, {}> {
  public render(): React.ReactElement<PeopleListProps> {
    return (
      <div>
        {this.props.people.length === 0 &&
          (this.props.selectedIndex !== 'Search' ||
            (this.props.selectedIndex === 'Search' &&
              this.props.hasSearchQuery)) &&
          <div className='ms-textAlignCenter'>No people found</div>}
        {this.props.people.length > 0 &&
          this.props.people.map(p => <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={p.phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />)}
      </div>
    );
  }
}
