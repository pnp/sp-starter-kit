import { DisplayMode } from '@microsoft/sp-core-library';
import { IPersonalContactsWebPartProps } from '../../PersonalContactsWebPart';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IPersonalContactsProps extends IPersonalContactsWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClient;
  updateProperty: (value: string) => void;
}