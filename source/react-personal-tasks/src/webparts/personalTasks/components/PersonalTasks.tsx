import { DisplayMode } from '@microsoft/sp-core-library';
import * as strings from 'PersonalTasksWebPartStrings';
import * as React from 'react';
import { IPersonalTasksProps } from './IPersonalTasksProps';
import styles from './PersonalTasks.module.scss';
import { TasksProps } from '@microsoft/mgt-react';
import { TasksSource } from '@microsoft/mgt-spfx';
import { wrapMgt } from '@microsoft/mgt-react/dist/es6/spfx';

export const Tasks = wrapMgt<TasksProps>('mgt-tasks');

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
      <div className={styles.personalTasks} style={{ backgroundColor: backgroundColor }}>
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
        <Tasks
          dataSource={TasksSource[dataSource]}
          initialId={initialId}
          initialBucketId={initialBucketId}
          targetId={targetId}
          targetBucketId={targetBucketId}
          readOnly={!allowEditing}
          hideHeader={hideHeader} />
      </div>
    );
  }

  private _onTitleChange = (event: { target: { value: any; }; }): void => {
    this.props.onTitleChange(event.target.value);
  }
}
