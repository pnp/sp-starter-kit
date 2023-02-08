import * as React from 'react';
import { IPeopleListProps } from '.';
import {
  Persona,
  PersonaSize
} from '@fluentui/react/lib/Persona';
import * as strings from 'PeopleDirectoryWebPartStrings';
import styles from './PeopleList.module.scss';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IPeopleListState } from './IPeopleListState';
import { PeopleCallout } from '../PeopleCallout';
import { IPerson } from '../PeopleDirectory';

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
          this.props.people.map((p,i) => {
            const phone: string = p.phone && p.mobile ? `${p.phone}/${p.mobile}`: p.phone ? p.phone: p.mobile;
            // const toggleClassName: string = this.state.toggleClass ? `ms-Icon--ChromeClose ${styles.isClose}` : "ms-Icon--ContactInfo";
            return (
              <div key={i} className={styles.persona_card}>
                <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />
                <div id={`callout${i}`} onClick={this._onPersonaClicked(i, p)} className={styles.persona}>
                  <i className="ms-Icon ms-Icon--ContactInfo" aria-hidden="true"></i>
                </div>
                { this.state.showCallOut && this.state.calloutElement === i && (
                <Callout
                  className={this.state.showCallOut ? styles.calloutShow: styles.callout}
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

  private _onPersonaClicked = (index: number, person: IPerson) => (_event: any) => {
    this.setState({
      showCallOut: !this.state.showCallOut,
      calloutElement: index,
      person: person
    });
  }

  private _onCalloutDismiss = (_event: any) => {
    this.setState({
      showCallOut: false,
    });
  }
}
