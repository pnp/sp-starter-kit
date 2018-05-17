import { ICustomer } from "./ICustomer";

export interface ISearchNorthwindCustomersResponse {
    Username: string;
    RequestDateTime: Date;
    Customers: ICustomer[];
}