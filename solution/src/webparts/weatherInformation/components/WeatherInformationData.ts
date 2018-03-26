export interface WeatherInformationData {
    query: WeatherInformationQuery;
}

export interface WeatherInformationQuery {
    count: number;
    created: string;
    lang: string;
    results: WeatherInformationQueryResults;
}

export interface WeatherInformationQueryResults {
    channel: WeatherInformationQueryResultsChannel;
}

export interface WeatherInformationQueryResultsChannel {
    location: WeatherInformationLocation;
    item: WeatherInformationItem;
}

export interface WeatherInformationLocation {
    city: string;
    country: string;
    region: string;
}

export interface WeatherInformationItem {
    condition: WeatherInformationCondition;
}

export interface WeatherInformationCondition {
    code: string;
    date: string;
    temp: string;
    text: string;
}