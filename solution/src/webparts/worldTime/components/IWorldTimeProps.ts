import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IWorldTimeProps {
  description: string;
  timeZoneOffset: number;
  errorHandler: (errorMessage: string) => void;
  themeVariant: IReadonlyTheme | undefined;
}
