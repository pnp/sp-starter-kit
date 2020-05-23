import { ICustomer } from "../ICustomer";

export interface ILobIntegrationState {
    // used to show the Spinner while loading data
    loading: boolean;
    // value to search for
    searchFor?: string;
    // the list of customers to render
    customers?: ICustomer[];
    // current username, taken from the service response
    username?: string;
    // date and time of API invokation, taken from the service response
    requestDateTime?: Date;
}
