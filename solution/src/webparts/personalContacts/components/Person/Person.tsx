import * as React from 'react';
import styles from './Person.module.scss';
import { IPersonProps, IPersonState } from '.';
import { Persona, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { GraphError } from '@microsoft/microsoft-graph-client/lib/src/common';

export class Person extends React.Component<IPersonProps, IPersonState> {
  constructor(props: IPersonProps) {
    super(props);

    this.state = {
      image: null
    };
  }

  /**
   * Renders the secondary field as mail
   */
  private _renderMail = (props: IPersonaProps) => {
    if (props.secondaryText) {
      return <Link href={`mailto:${props.secondaryText}`}>{props.secondaryText}</Link>;
    }

    return <div />;
  }

  /**
   * Renders the tertiary field as mail
   */
  private _renderPhone = (props: IPersonaProps) => {
    if (props.tertiaryText) {
      return <Link href={`tel:${props.tertiaryText}`}>{props.tertiaryText}</Link>;
    }

    return <div />;
  }

  private _setPhoto(rawResponse: any): void {
    if (rawResponse && rawResponse.xhr && rawResponse.xhr.response) {
      const url = window.URL;
      const blobUrl = url.createObjectURL(rawResponse.xhr.response);
      this.setState({
        image: blobUrl
      });
    }
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    const { person, graphClient } = this.props;
    if (!person) {
      return;
    }

    // download contact photo
    graphClient
      .api(`me/contacts/${person.id}/photo/$value`)
      .version('v1.0')
      .responseType('blob')
      .get((err: GraphError, res, rawResponse): void => {
        if (err && err.statusCode === 404) {
          // no photo set on the contact, try retrieving from the user object

          if (!person.emailAddresses ||
            person.emailAddresses.length < 1) {
            // no email available, can't retrieve photo for the user
            return;
          }

          graphClient
            .api(`users/${person.emailAddresses[0].address}/photo/$value`)
            .version('v1.0')
            .responseType('blob')
            .get((err2: GraphError, res2, rawResponse2): void => {
              this._setPhoto(rawResponse2);
            });
        }
        else {
          this._setPhoto(rawResponse);
        }
      });
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<IPersonProps> {
    const { person } = this.props;
    let phoneNr: string = null;

    if (person.businessPhones && person.businessPhones.length > 0) {
      phoneNr = person.businessPhones[0];
    }
    else {
      if (person.mobilePhone) {
        phoneNr = person.mobilePhone;
      }
      else {
        if (person.homePhones && person.homePhones.length > 0) {
          phoneNr = person.homePhones[0];
        }
      }
    }

    return <Persona className={styles.persona}
      primaryText={person.displayName}
      secondaryText={(person.emailAddresses && person.emailAddresses.length > 0) && person.emailAddresses[0].address}
      onRenderSecondaryText={this._renderMail}
      tertiaryText={phoneNr}
      onRenderTertiaryText={this._renderPhone}
      imageUrl={this.state.image}
      size={PersonaSize.size72} />;
  }
}