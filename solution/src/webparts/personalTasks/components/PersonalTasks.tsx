import * as React from 'react';
import styles from './PersonalTasks.module.scss';
import * as strings from 'PersonalTasksWebPartStrings';
import { IPersonalTasksProps, IPersonalTasksState, ITasks, ITask } from '.';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

export class PersonalTasks extends React.Component<IPersonalTasksProps, IPersonalTasksState> {
  // domain name based on the login name of the current user
  // used to construct view task/all link
  private _currentDomain: string;

  constructor(props: IPersonalTasksProps) {
    super(props);

    this.state = {
      tasks: [],
      loading: false,
      error: undefined
    };

    this._currentDomain = props.userName.substr(props.userName.indexOf('@') + 1);
  }

  /**
   * Load tasks for the current user
   */
  private _loadTasks(): void {
    if (!this.props.graphClient) {
      return;
    }

    // update state to indicate loading and remove any previously loaded
    // tasks
    this.setState({
      error: null,
      loading: true,
      tasks: []
    });

    this.props.graphClient
      .api("me/planner/tasks")
      .version("v1.0")
      .select("title,percentComplete,dueDateTime,completedDateTime,id")
      .orderby("dueDateTime")
      .get((err: any, res: ITasks): void => {
        if (err) {
          // Something failed calling the MS Graph
          this.setState({
            error: err.message ? err.message : strings.Error,
            loading: false
          });
          return;
        }

        // Check if a response was retrieved
        if (res && res.value && res.value.length > 0) {
          this.setState({
            // sort tasks ascending by their due date. This is necessary
            // because MS Graph returns unsorted results
            tasks: res.value.sort((t1: ITask, t2: ITask): number => {
              if (t1.dueDateTime < t2.dueDateTime) return -1;
              if (t1.dueDateTime > t2.dueDateTime) return 1;
              return 0;
            }),
            loading: false
          });
        }
        else {
          // No messages found
          this.setState({
            loading: false
          });
        }
      });
  }

  /**
   * Render task item
   */
  private _onRenderCell = (item: ITask, index: number | undefined): JSX.Element => {
    return <Link href={`https://tasks.office.com/${this._currentDomain}/en-US/Home/Task/${item.id}`} className={styles.task} target='_blank'>
      <div className={styles.title}>{item.title}</div>
      {item.dueDateTime &&
        <div className={styles.dueDateWrapper}>
          <div className={`${styles.dueDateTime} ${(item.dueDateTime && new Date(item.dueDateTime) < new Date() ? styles.isLate : '')}`}>
            <i className="ms-Icon ms-Icon--Calendar" aria-hidden="true"></i>
            <div className={styles.label}>{this._getDueDate(item.dueDateTime)}</div>
          </div>
        </div>}
    </Link>;
  }

  /**
   * Display name for the due date. If task is due in the current year,
   * returns only day and month, otherwise day, month and year.
   * @param dueDateTime String containing the task's due date in ISO format
   */
  private _getDueDate(dueDateTime?: string): string {
    if (!dueDateTime) {
      return dueDateTime;
    }

    const dueDate: Date = new Date(dueDateTime);
    const dueYear: number = dueDate.getUTCFullYear();
    let dueDateString: string = dueDate.toLocaleDateString();

    if (dueYear === new Date().getUTCFullYear()) {
      // if the due year is the same as the current year, remove the year
      // and the separator from the due date string
      dueDateString = dueDateString.replace(dueYear.toString(), '').replace(/(^[^\d]|[^\d]$)/g, '');
    }

    return dueDateString;
  }

  public componentDidMount(): void {
    // load data initially after the component has been instantiated
    this._loadTasks();
  }

  public render(): React.ReactElement<IPersonalTasksProps> {
    const notStarted: ITask[] = [];
    const inProgress: ITask[] = [];
    const completed: ITask[] = [];
    // assign tasks based on their state to the different buckets
    // do it here, to iterate through the list of all tasks only once
    this.state.tasks.forEach(t => {
      if (t.completedDateTime) {
        completed.push(t);
        return;
      }

      if (t.percentComplete > 0) {
        inProgress.push(t);
      }
      else {
        notStarted.push(t);
      }
    });

    return (
      <div className={styles.personalTasks}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} className={styles.webPartTitle} />
        {
          this.state.loading &&
          <Spinner label={strings.Loading} size={SpinnerSize.large} />
        }

        {
          this.state.tasks &&
            this.state.tasks.length > 0 ? (
              <div>
                {notStarted.length > 0 &&
                  <div>
                    <div className={styles.groupTitle}>{strings.NotStarted}</div>
                    <List items={notStarted} onRenderCell={this._onRenderCell} />
                  </div>
                }
                {inProgress.length > 0 &&
                  <div>
                    <div className={styles.groupTitle}>{strings.InProgress}</div>
                    <List items={inProgress} onRenderCell={this._onRenderCell} />
                  </div>
                }
                {this.props.showCompleted && completed.length > 0 &&
                  <div>
                    <div className={styles.groupTitle}>{strings.Completed}</div>
                    <List items={completed} onRenderCell={this._onRenderCell} className={styles.completed} />
                  </div>
                }
                <Link href={`https://tasks.office.com/${this._currentDomain}/en-US/Home/Planner/#/mytasks`} target='_blank' className={styles.viewAll}>{strings.ViewAll}</Link>
              </div>
            ) : (
              !this.state.loading && (
                this.state.error ?
                  <span className={styles.error}>{this.state.error}</span> :
                  <span className={styles.noTasks}>{strings.NoTasks}</span>
              )
            )
        }
      </div>
    );
  }
}
