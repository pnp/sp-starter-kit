export interface IWorldClockProps {
  description: string;
  timeZoneOffset: number;
  errorHandler: (errorMessage: string) => void;
}
