import { IContextualMenuItem } from 'office-ui-fabric-react';
import { ICollabFooterEditResult } from './ICollabFooterEditResult';

export interface ICollabFooterProps {
    // used to pass the menu items from the extension to the React component
    sharedLinks: IContextualMenuItem[];
    // used to pass the personal links menu item
    myLinks: IContextualMenuItem[];
    // function to edit the list of my links
    editMyLinks: () => Promise<ICollabFooterEditResult>;
}
