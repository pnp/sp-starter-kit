import { TasksSource } from '@microsoft/mgt-spfx';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IPersonalTasksProps {
  /**
   * The web part title
   */
  webPartTitle: string;
  /**
   * Tasks' data source - Planner or ToDo
   */
  dataSource: TasksSource;
  /**
   * Flag if editing is allowed. Default is false.
   */
  allowEditing: boolean;
  /**
   * Flag if the header on MS Graph Toolkit Personal Tasks component should be hidden.
   * The header contains a filter and "Add" button.
   * Default is true.
   */
  hideHeader: boolean;
  /**
   * A string id to set the initially displayed planner or folder to the provided ID.
   */
  initialId: string;
  /**
   * A string id to set the initially displayed bucket (Planner Data-Source Only) to the provided ID.
   */
  initialBucketId: string;
  /**
   * A string id to lock the tasks interface to the provided planner or folder ID.
   */
  targetId: string;
  /**
   * A string ID to lock the tasks interface to the provided bucket ID (Planner Data-Source Only).
   */
  targetBucketId: string;
  /**
   * Current display mode of the web part
   */
  displayMode: DisplayMode;
  /**
   * Web part's title change handler
   */
  onTitleChange: (value: string) => void;
  /**
   * Page's section theme
   */
  themeVariant: IReadonlyTheme | undefined;
}
