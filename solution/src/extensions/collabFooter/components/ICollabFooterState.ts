import { IContextualMenuItem } from 'office-ui-fabric-react';

export interface ICollabFooterState {
    // state variable to show the result of saving my links
    myLinksSaved?: boolean;
    // used to hold the personal links menu item
    myLinks: IContextualMenuItem[];
}
