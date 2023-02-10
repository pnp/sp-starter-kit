import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import supporting types
import IMyLink from './IMyLink';
import styles from './MyLinks.module.scss';
import * as strings from 'MyLinksStrings';

// import additional controls/components
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { DialogContent, DialogFooter } from '@fluentui/react/lib/Dialog';

/**
 * Define the columns that will be used to render the list of links
 */
const _linksColumns: IColumn[] = [
  {
    key: 'TitleColumn',
    name: strings.TitleColumn,
    fieldName: 'title',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.TitleColumnAriaLabel
  },
  {
    key: 'urlColumn',
    name: strings.UrlColumn,
    fieldName: 'url',
    minWidth: 150,
    maxWidth: 350,
    isResizable: true,
    ariaLabel: strings.UrlColumnAriaLabel
  },
];

/**
 * Defines the initialization properties for the MyLinks dialog window
 */
interface IMyLinksDialogContentProps {
  // the array of Links to render/manage
  links: Array<IMyLink>;
  // cancel button handler, to undo the changes
  cancel: () => void;
  // save button handler, to save the Links
  save: (links: Array<IMyLink>) => void;
}

/**
 * Defines the state for the MyLinks dialog window
 */
interface IMyLinksDialogContentState {
  // the Links to render/manage
  links: Array<IMyLink>;
  // currently selected item, if any
  selectedLink?: IMyLink;
  // defines whether to show the detail (add/edit) panel or not
  showDetailPanel?: boolean;
  // defines whether the dialog is adding a new item
  addingNewItem?: boolean;
  // title for the pending editing item
  title?: string;
  // url for the pending editing item
  url?: string;
}

/**
 * Defines the main content of the MyLinks dialog
 */
class MyLinksDialogContent extends
  React.Component<IMyLinksDialogContentProps, IMyLinksDialogContentState> {

  // to handle item selection in the DetailsList of Links
  private _selection: Selection;

  constructor(props: IMyLinksDialogContentProps) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => {
        let selectedLink: IMyLink = this._selection.getSelectedCount() !== 0 ? this._selection.getSelection()[0] as IMyLink : null;
        this.setState({ selectedLink: selectedLink });
      }
    });

    this.state = {
      links: this.props.links && this.props.links.length > 0 ? this.props.links : [],
      showDetailPanel: false,
    };
  }

  public componentDidMount(): void {
    // fire the resize event to paint the content of the dialog
    let resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
  }

  /**
   * Renders the dialog content using an Office UI Fabric grid
   */
  public render(): JSX.Element {
    return (<div className={styles.myLinksDialogRoot}>
      <DialogContent
        title={strings.MyLinksDialogTitle}
        subText={strings.MyLinksDialogDescription}
        onDismiss={this.props.cancel}
        showCloseButton={!this.state.showDetailPanel}>

        <div className={styles.myLinksDialogContent}>
          <div className="ms-Grid">
            {this.state.showDetailPanel ?
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                  <div className="ms-Grid">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <TextField
                          label={strings.LinkTitleLabel}
                          required={true}
                          value={this.state.title}
                          minLength={150}
                          className={styles.textField}
                          onChange={this._onChangedTitle}
                        />
                      </div>
                    </div>
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <TextField
                          label={strings.LinkUrlLabel}
                          required={true}
                          value={this.state.url}
                          minLength={150}
                          className={styles.textField}
                          onChange={this._onChangedUrl}
                          onGetErrorMessage={this._getErrorMessageUrl}
                        />
                      </div>
                    </div>
                    <div className={`ms-Grid-row ${styles.editPanel}`}>
                      <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                        <DefaultButton text={strings.DialogCancelButton}
                          title={strings.DialogCancelButton} onClick={this._cancelEdit} />
                        <DefaultButton primary={true}
                          text={this.state.addingNewItem ? strings.DialogAddButton : strings.DialogUpdateButton}
                          title={this.state.addingNewItem ? strings.DialogAddButton : strings.DialogUpdateButton}
                          onClick={this._saveEdit} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : null}
            {!this.state.showDetailPanel ?
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                  <CommandBar items={[
                    {
                      key: 'addRow',
                      name: strings.AddLinkCommand,
                      icon: 'Add',
                      onClick: this.addLink,
                    },
                    {
                      key: 'editRow',
                      name: strings.EditLinkCommand,
                      icon: 'Edit',
                      onClick: this.editLink,
                      disabled: (this.state.selectedLink == null),
                    },
                    {
                      key: 'deleteRow',
                      name: strings.DeleteLinkCommand,
                      icon: 'Delete',
                      onClick: this.deleteLink,
                      disabled: (this.state.selectedLink == null),
                    },
                  ]} />
                </div>
              </div>
              : null}
            {!this.state.showDetailPanel ?
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                  <DetailsList
                    items={this.state.links}
                    columns={_linksColumns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={this._selection}
                    selectionMode={SelectionMode.single}
                    selectionPreservedOnEmptyClick={true}
                    ariaLabelForSelectionColumn={strings.SelectionColumnAriaLabel}
                    ariaLabelForSelectAllCheckbox={strings.SelectionAllColumnAriaLabel}
                  />
                </div>
              </div>
              : null}
          </div>
        </div>
        {!this.state.showDetailPanel ?
          <DialogFooter>
            <DefaultButton text={strings.DialogCancelButton}
              title={strings.DialogCancelButton} onClick={this.props.cancel} />
            <DefaultButton text={strings.DialogSaveButton} primary={true}
              title={strings.DialogSaveButton} onClick={() => { this.props.save(this.state.links); }} />
          </DialogFooter>
          : null}
      </DialogContent>
    </div>);
  }

  private _cancelEdit = (): void => {
    // disable the detail panel
    this.setState({
      showDetailPanel: false,
      title: "",
      url: "",
    });
  }

  private _saveEdit = (): void => {

    if (!this.state.addingNewItem) {

      let updatedLink: IMyLink = {
        title: this.state.title,
        url: this.state.url,
      };

      // update the selected item
      this.state.links[this.state.links.indexOf(this.state.selectedLink)] = updatedLink;

      // refresh the array of Links
      let updatedLinks: IMyLink[] = this.state.links.concat([]);

      // update the list of links and disable the detail panel
      this.setState({
        showDetailPanel: false,
        links: updatedLinks
      });

    } else {

      let newLink: IMyLink = {
        title: this.state.title,
        url: this.state.url,
      };

      // if we have a valid new link
      if (newLink != null &&
        newLink.title != null && newLink.title.length > 0 &&
        newLink.url != null && newLink.url.length > 0) {

        // add the new item to the array of Links
        let updatedLinks: IMyLink[] = this.state.links.concat([newLink]);

        // update the list of links and disable the detail panel
        this.setState({
          showDetailPanel: false,
          links: updatedLinks
        });
      }
    }
  }

  private _onChangedTitle = (event: React.FormEvent<HTMLElement>, newValue?: string) => {
    this.setState({
      title: newValue,
    });
  }

  private _onChangedUrl = (event: React.FormEvent<HTMLElement>, newValue?: string) => {
    this.setState({
      url: newValue,
    });
  }

  private _getErrorMessageUrl = (value: string): string => {
    // validate the URL with a specific Regular Expression
    const regEx: RegExp = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
    return (value == null || value.length === 0 || regEx.test(value) ? "" : strings.InvalidUrlError);
  }

  private addLink = (): void => {
    if (this.state.selectedLink != null &&
      this.state.links != null &&
      this.state.links.length > 0) {
      this._selection.toggleIndexSelected(this.state.links.indexOf(this.state.selectedLink));
    }

    // enable the detail panel
    this.setState({
      showDetailPanel: true,
      addingNewItem: true,
      title: "",
      url: "",
      selectedLink: null
    });
  }

  private editLink = (): void => {
    // enable the detail panel
    this.setState({
      showDetailPanel: true,
      addingNewItem: false,
      title: this.state.selectedLink.title,
      url: this.state.selectedLink.url
    });
  }

  private deleteLink = (): void => {
    // delete the selected link
    this.state.links.splice(this.state.links.indexOf(this.state.selectedLink), 1);

    // refresh the array of Links
    let updatedLinks: IMyLink[] = this.state.links.concat([]);

    // refresh the DetailsList view
    this.setState({
      links: updatedLinks
    });
  }
}

/**
 * Dialog window to show the list of links
 */
export default class MyLinksDialog extends BaseDialog {

  // to keep track of the initial links in case user will cancel
  private initialLinks: IMyLink[];

  /**
   * Constructor for the dialog window
   */
  constructor(public links: Array<IMyLink>, public isSave?: boolean) {
    // Blocking or else click outside causes error in 1.7
    super({ isBlocking: true });

    // clone the initial list of links we've got
    this.initialLinks = (this.links != null) ? this.links.concat([]) : [];
  }

  public render(): void {
    ReactDOM.render(<MyLinksDialogContent
      links={this.links}
      cancel={this._cancel}
      save={this._save}
    />,
      this.domElement);
  }

  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: true
    };
  }

  private _cancel = (): void => {
    this.isSave = false;
    this.links = this.initialLinks;
    // Fix for all browsers regarding SP Dialog not being to open twice
    ReactDOM.unmountComponentAtNode(this.domElement);
    this.close();
  }

  private _save = (links: Array<IMyLink>): void => {
    this.isSave = true;
    // Fix for all browsers regarding SP Dialog not being to open twice
    ReactDOM.unmountComponentAtNode(this.domElement);
    this.links = links;
    this.close();
  }
}
