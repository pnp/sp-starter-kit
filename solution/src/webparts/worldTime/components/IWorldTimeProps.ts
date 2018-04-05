export interface IWorldTimeProps {
  description: string;
  timeZoneOffset: number;
  errorHandler: (errorMessage: string) => void;
}
