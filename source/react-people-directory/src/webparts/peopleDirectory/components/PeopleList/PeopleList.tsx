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
                  <img className="ms-Icon" src="data:image/x-icon;base64,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" />
                  {/* <img className={styles.contactInfo} src={ require(/assets/images/ContactInfo.ico")}aria-hidden="true" /> */}
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
