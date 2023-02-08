import * as React from 'react';
import { IPeopleCalloutProps, IPeopleCalloutState } from '.';
import styles from './PeopleCallout.module.scss';
import * as strings from 'PeopleDirectoryWebPartStrings';

export class PeopleCallout extends React.Component<IPeopleCalloutProps, IPeopleCalloutState> {
  constructor(props: IPeopleCalloutProps) {
    super(props);

    this.state = {
    };
  }

  public render(): React.ReactElement<IPeopleCalloutProps> {
    return (
      <div className={styles.calloutCard}>
        <h1 className={"ms-font-xl"}>
          {this.props.person.name}
        </h1>
        <ul className={styles.PeopleCallout}>
          {this.props.person.function &&
            <li>{this.props.person.function}</li>
          }
          {this.props.person.department &&
            <li>{this.props.person.department}</li>
          }
          {this.props.person.email &&
            <li id="personcopyemail">
              <i className="ms-Icon ms-Icon--Mail icon" aria-hidden="true"></i>
              <a href={`mailto:${this.props.person.email}`} className={styles.info}>
                {this.props.person.email}
              </a>
              <i className={`ms-Icon ms-Icon--Copy ${styles.clipboard}`} aria-hidden="true" title={strings.CopyEmailLabel} onClick={this._onCopyClicked('personcopyemail')}></i>
            </li>
          }
          {this.props.person.phone &&
            <li id="personcopyphone">
              <i className="ms-Icon ms-Icon--Phone icon" aria-hidden="true"></i>
              <a href={`tel:${this.props.person.phone}`} className={styles.info}>
                {this.props.person.phone}
              </a>
              <i className={`ms-Icon ms-Icon--Copy ${styles.clipboard}`} aria-hidden="true" title={strings.CopyPhoneLabel} onClick={this._onCopyClicked('personcopyphone')}></i>
            </li>
          }
          {this.props.person.mobile &&
            <li id="personcopymobile">
              <i className="ms-Icon ms-Icon--CellPhone icon" aria-hidden="true"></i>
              <a href={`tel:${this.props.person.mobile}`} className={styles.info}>
                {this.props.person.mobile}
              </a>
              <i className={`ms-Icon ms-Icon--Copy ${styles.clipboard}`} aria-hidden="true" title={strings.CopyMobileLabel} onClick={this._onCopyClicked('personcopymobile')}></i>
            </li>
          }
          {this.props.person.projects &&
            <li className={styles.info + ' ' + styles.fl_column}>
              <label className="ms-fontSize-xl ms-fontWeight-light">{strings.ProjectsLabel}</label>
              <div>{this.props.person.projects}</div>
            </li>
          }
          {this.props.person.skills &&
            <li className={styles.info + ' ' + styles.fl_column}>
              <label className="ms-fontSize-xl ms-fontWeight-light">{strings.SkillsLabel}</label>
              <div>{this.props.person.skills}</div>
            </li>
          }
        </ul>
      </div>
    );
  }

  private _onCopyClicked = (elementName: string) => (event: any) => {
    let copyText = document.getElementById(elementName);
    var range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    event.target.className = "ms-Icon ms-Icon--StatusCircleCheckmark";
  }
}
