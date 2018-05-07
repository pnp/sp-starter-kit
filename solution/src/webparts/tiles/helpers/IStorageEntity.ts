export interface IStorageEntity {
  '@odata.context': string;
  '@odata.type': string;
  '@odata.id': string;
  '@odata.editLink': string;
  Comment: string;
  Description: string;
  Value: string;
  error?: any;
}
