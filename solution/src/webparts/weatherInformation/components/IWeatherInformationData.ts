export interface IWeatherInformationData {
    query: IWeatherInformationQuery;
}

export interface IWeatherInformationQuery {
    count: number;
    created: string;
    lang: string;
    results: IWeatherInformationQueryResults;
}

export interface IWeatherInformationQueryResults {
    channel: IWeatherInformationQueryResultsChannel;
}

export interface IWeatherInformationQueryResultsChannel {
    location: IWeatherInformationLocation;
    item: IWeatherInformationItem;
}

export interface IWeatherInformationLocation {
    city: string;
    country: string;
    region: string;
}

export interface IWeatherInformationItem {
    condition: IWeatherInformationCondition;
}

export interface IWeatherInformationCondition {
    code: string;
    date: string;
    temp: string;
    text: string;
}