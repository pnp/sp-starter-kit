export interface IPagingProps {
  prevLink: string;
  nextLink: string;

  fPaging: (val: string) => void;
}
