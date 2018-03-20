import * as React from 'react';
import { ICollabFooterProps } from './ICollabFooterProps';
import { ICollabFooterState } from './ICollabFooterState';

export default class SiteClassificationHeader extends React.Component<ICollabFooterProps, ICollabFooterState> {

   /**
   * Main constructor for the component
   */
  constructor() {
    super();
    this.state = {
    };
  }

  public render(): React.ReactElement<ICollabFooterProps> {
    return (
      <div className={`ms-bgColor-blue ms-fontColor-white`}>
        <div className={`ms-bgColor-blue ms-fontColor-white`}>
        This will be the 'Footer for collaboration' extension
        </div>
      </div>
    );
  }
}
