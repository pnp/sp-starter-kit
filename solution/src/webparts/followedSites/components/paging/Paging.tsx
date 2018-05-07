import * as React from 'react';
import styles from './Paging.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IPagingProps, IPagingState } from '.';

export class Paging extends React.Component<IPagingProps, IPagingState> {
  constructor(props: IPagingProps) {
    super(props);

    this.state = {
      crntPage: 0
    };
  }

  /**
   * Load the previous page
   */
  private _prevPage = (): void => {
    let { crntPage } = this.state;
    if (crntPage > 0) {
      crntPage--;
      // Update the current page
      this.setState({
        crntPage
      });
      // Update elements to render
      this._triggerUpdate(crntPage);
    }
  }

  /**
   * Load the previous page
   */
  private _nextPage = (): void => {
    let { crntPage } = this.state;
    if ((this.props.nrOfItems*(this.state.crntPage)) < this.props.allItems.length) {
      crntPage++;
      // Update the current page
      this.setState({
        crntPage
      });
      // Update elements to render
      this._triggerUpdate(crntPage);
    }
  }

  /**
   * Triggers the update function with the new batch of items
   */
  private _triggerUpdate = (pageNr: number): void => {
    let allItems = [...this.props.allItems];
    // Pass the next batch of items to render to the parent component
    this.props.fUpdateItems(allItems.splice((pageNr * this.props.nrOfItems), this.props.nrOfItems));
  }

  /**
   * componentWillReceiveProps lifecycle hook
   * @param nextProps
   */
  public componentWillReceiveProps(nextProps: IPagingProps): void {
    // Check if items were filtered
    if (this.props.allItems.length !== nextProps.allItems.length) {
      this.setState({
        crntPage: 0
      });
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IPagingProps> {
    if (this.props.nrOfItems && this.props.allItems && this.props.allItems.length > this.props.nrOfItems) {
      return (
        <div className={styles.paging}>
          <DefaultButton onClick={this._prevPage}
                         disabled={this.state.crntPage <= 0}>
            <Icon iconName="ChevronLeft" />
          </DefaultButton>

          <span className={styles.pagingNrLabels}>
            {this.state.crntPage + 1}/{Math.ceil(this.props.allItems.length/this.props.nrOfItems)}
          </span>

          <DefaultButton onClick={this._nextPage}
                         disabled={(this.props.nrOfItems*(this.state.crntPage+1)) >= this.props.allItems.length}>
            <Icon iconName="ChevronRight" />
          </DefaultButton>
        </div>
      );
    }

    return null;
  }
}
