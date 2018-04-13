import * as React from 'react';
import styles from './Paging.module.scss';
import { IPagingProps, IPagingState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export default class Paging extends React.Component<IPagingProps, IPagingState> {
  constructor(props: IPagingProps) {
    super(props);

    this.state = {};
  }

  private _nextPage() {

  }

  private _prevPage() {

  }

  public render(): React.ReactElement<IPagingProps> {
    if (this.props.prevLink || this.props.nextLink) {
      return (
        <div className={styles.paging}>
          <DefaultButton onClick={this._prevPage}
                         disabled={!this.props.prevLink}>
            <Icon iconName="ChevronLeft" />
          </DefaultButton>

          <DefaultButton onClick={this._nextPage}
                         disabled={!this.props.nextLink}>
            <Icon iconName="ChevronRight" />
          </DefaultButton>
        </div>
      );
    }

    return null;
  }
}
