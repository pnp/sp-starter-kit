/**
 * Defines SP.UserProfiles.PersonProperties type
 */
export interface IPersonProperties {
    _ObjectType_: string;
    AccountName: string;
    UserProfileProperties: any;
}

/**
 * Defines the structure of the response for a User Profile property updated
 */
export interface ISetPropertyResponse {
    ErrorInfo: string;
    LibraryVersion: string;
    SchemaVersion: string;
    TraceCorrelationId: string;
}