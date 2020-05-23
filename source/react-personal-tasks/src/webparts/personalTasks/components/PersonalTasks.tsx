import * as React from 'react';
import styles from './PersonalTasks.module.scss';
import { IPersonalTasksProps } from './IPersonalTasksProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'PersonalTasksWebPartStrings';

//
// declaration to use MGT components
//
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mgt-tasks': any;
    }
  }
}


export class PersonalTasks extends React.Component<IPersonalTasksProps, {}> {
  public render(): React.ReactElement<IPersonalTasksProps> {
    const {
      webPartTitle,
      displayMode,
      dataSource,
      allowEditing,
      hideHeader,
      initialId,
      initialBucketId,
      targetId,
      targetBucketId,
      themeVariant
    } = this.props;

    //
    // supporting different themes for page's section
    //
    const color: string | null = (!!themeVariant && themeVariant.semanticColors.bodyText) || null;
    const backgroundColor: string | null = (!!themeVariant && themeVariant.semanticColors.bodyBackground) || null;

    return (
      <div className={styles.personalTasks} style={{backgroundColor: backgroundColor}}>
        {(webPartTitle || displayMode === DisplayMode.Edit) &&
          <div className={styles.webPartHeader}>
            <div className={styles.webPartTitle} style={{ color: color }}>
              {
                displayMode === DisplayMode.Edit && (
                  <textarea placeholder={strings.WebPartTitlePlaceholder} aria-label={strings.WebPartTitleLabel} onChange={this._onTitleChange} defaultValue={webPartTitle}></textarea>
                )
              }

              {
                displayMode !== DisplayMode.Edit && webPartTitle && <span role="heading" aria-level={2}>{webPartTitle}</span>
              }
            </div>
          </div>
        }
        <mgt-tasks
          data-source={dataSource}
          initial-id={initialId}
          initial-bucket-id={initialBucketId}
          target-id={targetId}
          target-bucket-id={targetBucketId}
          ref={el => {
            if (el) { // setting read-only and hide-header attributes if needed
              if (!allowEditing) {
                el.setAttribute('read-only', '');
              }
              else {
                el.removeAttribute('read-only');
              }
              if (hideHeader) {
                el.setAttribute('hide-header', '');
              }
              else {
                el.removeAttribute('hide-header');
              }
            }
          }}
        ></mgt-tasks>
      </div>
    );
  }

  private _onTitleChange = (event): void => {
    this.props.onTitleChange(event.target.value);
  }
}
