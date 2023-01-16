import { DisplayMode } from '@microsoft/sp-core-library';
import { IPersonalContactsWebPartProps } from '../../PersonalContactsWebPart';
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IPersonalContactsProps extends IPersonalContactsWebPartProps {
  displayMode: DisplayMode;
  graphClient: MSGraphClientV3;
  updateProperty: (value: string) => void;
}