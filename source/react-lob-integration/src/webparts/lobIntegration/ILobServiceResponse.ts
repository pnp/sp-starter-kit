import { ICustomer } from "./ICustomer";

export interface ILobServiceResponse {
    username: string;
    requestDateTime: Date;
    customers: ICustomer[];
}
