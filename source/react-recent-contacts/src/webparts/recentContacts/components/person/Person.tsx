import * as React from 'react';
import { IPersonProps, IPersonState } from '.';
import { Persona, PersonaSize, IPersonaProps } from '@fluentui/react/lib/Persona';
import { Link } from '@fluentui/react/lib/Link';

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

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    const { person, graphClient } = this.props;
    if (person) {
      // Check if the image can be retrieved
      const { personType } = person;
      if (personType && personType.class.toLowerCase() === "person" && personType.subclass.toLowerCase() === "organizationuser") {
        graphClient.api(`users/${person.id}/photo/$value`).version("v1.0").responseType('blob').get((err: any, res: any, rawResponse: { xhr: { response: Blob | MediaSource; }; }) => {
          // Check if the image was retrieved
          if (rawResponse && rawResponse.xhr && rawResponse.xhr.response) {
            const url = window.URL;
				    const blobUrl = url.createObjectURL(rawResponse.xhr.response);
            this.setState({
              image: blobUrl
            });
          }
        });
      }
    }
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<IPersonProps> {
    const { person } = this.props;
    let phoneNr: string = null;
    if (person.phones && person.phones.length > 0) {
      phoneNr = person.phones[0].number;
    }

    let email: string = null;
    if (person.scoredEmailAddresses && person.scoredEmailAddresses.length > 0) {
      email = person.scoredEmailAddresses[0].address;
    }

    return (
      <Persona className={this.props.className}
               primaryText={person.displayName}
               secondaryText={email}
               onRenderSecondaryText={this._renderMail}
               tertiaryText={phoneNr}
               onRenderTertiaryText={this._renderPhone}
               imageUrl={this.state.image}
               size={PersonaSize.size72} />
    );
  }
}
