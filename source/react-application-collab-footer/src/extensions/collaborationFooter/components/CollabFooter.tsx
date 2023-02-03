import * as React from 'react';
import styles from './CollabFooter.module.scss';

import { ICollabFooterProps } from './ICollabFooterProps';
import { ICollabFooterState } from './ICollabFooterState';
import { ICollabFooterEditResult } from './ICollabFooterEditResult';
import * as strings from 'CollaborationFooterApplicationCustomizerStrings';

// import additional controls/components
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ContextualMenuItemType, IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';

export default class CollabFooter extends React.Component<ICollabFooterProps, ICollabFooterState> {
  
   /**
   * Main constructor for the component
   */
  constructor(props: ICollabFooterProps) {
    super(props);

    this.state = {
      myLinks: props.myLinks,
    };
  }

  public render(): React.ReactElement<ICollabFooterProps> {
    
    // console.log("CollabFooter.render");
    // console.log(this.state.myLinks);

    let menuItems: IContextualMenuItem[] = this.props.sharedLinks;

    // add the personal menu items to the list of menu items
    if (this.state.myLinks != null && this.state.myLinks.length > 0) {
      menuItems = menuItems.concat([
        {
          key: "MyLinksRoot",
          name: strings.MyLinks,
          itemType: ContextualMenuItemType.Header,
          iconProps: {
            iconName: "Heart"
          },
          subMenuProps: {
            items: this.state.myLinks
          },
          isSubMenu: false,
        }
      ]);

      // console.log(menuItems);
    }

    if (menuItems != null && menuItems.length > 0) {
      return (
        <div className={ styles.collabFooter }>
          <div className={ styles.collabFooterContainer }>
            { this.state.myLinksSaved != null ? (this.state.myLinksSaved ?
                <MessageBar
                  messageBarType={ MessageBarType.success }>{ strings.MyLinksSaveSuccess }</MessageBar> :
                <MessageBar
                  messageBarType={ MessageBarType.error }>{ strings.MyLinksSaveFailed }</MessageBar>) : null }
            <CommandBar
              className={ styles.commandBar }
              items={ menuItems }
              farItems={ (this.props.myLinks != null ? [
                {
                  key: "editMyLinks",
                  name: strings.EditMyLinks,
                  itemType: ContextualMenuItemType.Header,
                  iconProps: {
                    iconName: "Edit"
                  },
                  isSubMenu: false,
                  onClick: this._editMyLinks,
                }
              ] : []) }
              />
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }

  // method used to edit and save personal items
  private _editMyLinks = (): void => {
    this.props.editMyLinks()
      .then((editResult: ICollabFooterEditResult): void => {
        // show result message
        this.setState({
          myLinksSaved: editResult.editResult,
          myLinks: editResult.myLinks,
        });

        if (editResult != null) {
          // hide the message after 2 sec
          window.setTimeout(() => {
            this.setState({
              myLinksSaved: null,
              });
            }, 2000);
        }
      });
  }
}
