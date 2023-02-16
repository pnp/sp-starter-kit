import * as React from 'react';
import styles from './RecentContacts.module.scss';
import { IRecentContactsProps, IRecentContactsState, IContacts, IContact } from '.';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import * as strings from 'RecentContactsWebPartStrings';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { List } from '@fluentui/react/lib/List';
import { Get, MgtTemplateProps, Person } from '@microsoft/mgt-react/dist/es6/spfx';
import { Link } from '@fluentui/react/lib/Link';

export class RecentContacts extends React.Component<IRecentContactsProps> {
  constructor(props: IRecentContactsProps) {
    super(props);
  }

  private PersonComponent(props: MgtTemplateProps) {
    const data = props.dataContext;

    return (
      <div className={styles.header} >
        <Person
          key={data.id}
          personQuery={data.displayName}
          avatarSize={'large'}
          fetchImage={true}
        />
        <div className={styles.personaDetails}>
          <div className={styles.titleText}> {data.displayName}</div>
          {data?.emailAddresses.length && data.emailAddresses[0].address && <Link href={`mailto:${data.emailAddresses[0].address}`}>{data.emailAddresses[0].address}</Link>}
          {data?.phones?.length ? <Link href={`tel:${data.phones[0].number}`}>{data.phones[0].number}</Link> : ''}
        </div>
      </div >
    )

  }

  private LoaderComponent(props: MgtTemplateProps) {
    return (<Spinner label={strings.Loading} size={SpinnerSize.large} />);
  }

  private ErrorComponent(props: MgtTemplateProps) {
    return (<span className={styles.error}>{JSON.parse(props?.dataContext?.body).message || strings.Error}</span>);
  }
  

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IRecentContactsProps> {
    const noOfContact = this.props.nrOfContacts || 5;
    const peopleEndpointUrl = `/me/people?$top=${noOfContact}`;
    const maxPages = 1;

    return (
      <div className={styles.recentContacts}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />

        <div className={styles.personaDetails}>
          <Get resource={peopleEndpointUrl} max-pages={maxPages} version="beta" scopes={["People.Read.All"]} >
            <this.PersonComponent template='value' />
            <this.LoaderComponent template='loading' />
            <this.ErrorComponent template='error' />
          </Get>
        </div>
      </div>
    );
  }
}