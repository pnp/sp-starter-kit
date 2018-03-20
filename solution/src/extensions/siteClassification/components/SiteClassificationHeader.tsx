import * as React from 'react';
import { ISiteClassificationHeaderProps } from './ISiteClassificationHeaderProps';
import { ISiteClassificationHeaderState } from './ISiteClassificationHeaderState';

export default class SiteClassificationHeader extends React.Component<ISiteClassificationHeaderProps, ISiteClassificationHeaderState> {

   /**
   * Main constructor for the component
   */
  constructor() {
    super();
    this.state = {
    };
  }

  public render(): React.ReactElement<ISiteClassificationHeaderProps> {
    return (
      <div className={`ms-bgColor-blue ms-fontColor-white`}>
        <div className={`ms-bgColor-blue ms-fontColor-white`}>
        This will be the 'Classification header for collaboration' extension
        </div>
      </div>
    );
  }
}
