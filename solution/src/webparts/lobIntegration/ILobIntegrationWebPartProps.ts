export interface ILobIntegrationWebPartProps {
    webapiUri: string;
    functionUri: string;
    serviceType?: serviceType;
}

// defines the available flavors for back-end LOB services
export enum serviceType {
    // the LOB service is built using ASP.NET
    AspNetRestAPI = 1,
    // the LOB service is build using an Azure Function
    AzureFunction = 2,
}