import { IStockInformationData } from "./IStockInformationData";

export interface IStockInformationState {
  // used to show the Spinner while loading stock information
  loading: boolean;
  // the real stock information data
  stockInfo?: IStockInformationData;
}
