import { ICustomer } from "./ICustomer";

export interface IClaim {
    m_issuer: string;
    m_originalIssuer: string;
    m_properties: any;
    m_type: string;
    m_value: string;
    m_valueType: string;
}

// interface defining the response provided by the Azure Function
export interface IListNorthwindCustomersResponse {
    CurrentPrincipalClaims: IClaim[];
    Customers: ICustomer[];
    RequestDateTime: Date;
}