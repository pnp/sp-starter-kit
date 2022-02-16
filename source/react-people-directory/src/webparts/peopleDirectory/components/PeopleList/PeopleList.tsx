import * as React from 'react';
import { IPeopleListProps } from '.';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/Persona';
import * as strings from 'PeopleDirectoryWebPartStrings';
import styles from './PeopleList.module.scss';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { IPeopleListState } from './IPeopleListState';
import { PeopleCallout } from '../PeopleCallout';
import { css } from 'office-ui-fabric-react';

export class PeopleList extends React.Component<IPeopleListProps, IPeopleListState> {
  constructor(props: IPeopleListProps) {
    super(props);

    this.state = {
      showCallOut: false,
      calloutElement: null,
      person: null
    };

    //this._onPersonaClicked = this._onPersonaClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
  }

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
          //this.props.people.map(p => <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={p.phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />)
          this.props.people.map((p, i) => {
            const phone: string = p.phone && p.mobile ? `${p.phone}/${p.mobile}` : p.phone ? p.phone : p.mobile;
            // const toggleClassName: string = this.state.toggleClass ? `ms-Icon--ChromeClose ${styles.isClose}` : "ms-Icon--ContactInfo";
            return (
              <div className={styles.persona_card}>
                <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />
                <div id={`callout${i}`} onClick={this._onPersonaClicked(i, p)} className={styles.persona}>
                  <svg className="ms-Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M740 1077q65 33 117 81t90 108 57 128 20 142H896q0-79-30-149t-83-122-122-82-149-31q-79 0-149 30t-122 83-82 122-31 149H0q0-73 20-141t57-128 89-108 118-82q-73-54-114-136t-42-173q0-79 30-149t83-122 122-82 149-31q79 0 149 30t122 83 82 122 31 149q0 91-41 173t-115 136zM256 768q0 53 20 99t55 81 81 55 100 21q52 0 99-20t81-55 55-81 21-100q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99zm1792-384v128h-896V384h896zm-896 512h896v128h-896V896zm0 512h896v128h-896v-128z" /></svg>
                </div>
                {this.state.showCallOut && this.state.calloutElement === i && (
                  <Callout
                    className={this.state.showCallOut ? styles.calloutShow : styles.callout}
                    gapSpace={16}
                    target={`#callout${i}`}
                    isBeakVisible={true}
                    beakWidth={18}
                    setInitialFocus={true}
                    onDismiss={this._onCalloutDismiss}
                    directionalHint={DirectionalHint.rightCenter}
                    doNotLayer={false}
                  >
                    <PeopleCallout person={this.state.person}></PeopleCallout>
                  </Callout>
                )}
              </div>
            );
          })
        }
      </div>
    );
  }

  private _onPersonaClicked = (index, person) => event => {
    this.setState({
      showCallOut: !this.state.showCallOut,
      calloutElement: index,
      person: person
    });
  }

  private _onCalloutDismiss = (event) => {
    this.setState({
      showCallOut: false,
    });
  }
}
