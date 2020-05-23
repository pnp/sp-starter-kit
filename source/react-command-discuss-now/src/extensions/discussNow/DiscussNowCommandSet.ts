import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'DiscussNowCommandSetStrings';

import ScheduleMeetingDialog from './components/ScheduleMeetingDialog';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDiscussNowCommandSetProperties {
  // This is an example; replace with your own property
  disabledCommandIds: string[] | undefined;
}

const LOG_SOURCE: string = 'DiscussNowCommandSet';

export default class DiscussNowCommandSet extends BaseListViewCommandSet<IDiscussNowCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DiscussNowCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    // show the command just in case a single item is selected
    const scheduleMeetingCommand: Command | undefined = this.tryGetCommand('DISCUSS_NOW');
    scheduleMeetingCommand.visible = event.selectedRows.length == 1;
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'DISCUSS_NOW':

        const id: number = event.selectedRows[0].getValueByName("ID");
        const fileName: string = event.selectedRows[0].getValueByName("FileLeafRef");
        const filePath: string = event.selectedRows[0].getValueByName("ServerRedirectedEmbedUrl");

        const dialog: ScheduleMeetingDialog = new ScheduleMeetingDialog();
        dialog.fileName = fileName;
        dialog.filePath = filePath;
        dialog.context = this.context;

        dialog.show();

      break;
    default:
      throw new Error('Unknown command');
    }
  }
}
