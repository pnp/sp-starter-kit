import { DisplayMode } from '@microsoft/sp-core-library';
import { IPersonalContactsWebPartProps } from '../../PersonalContactsWebPart';
import { MSGraphClient } from '@microsoft/sp-client-preview';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IPersonalContactsProps extends IPersonalContactsWebPartProps {
  context: WebPartContext;
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
}