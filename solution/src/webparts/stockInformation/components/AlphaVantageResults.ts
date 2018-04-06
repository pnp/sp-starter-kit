// this code file defines the data types used by Alpha Vantage to return the stock information

export interface IAVResults {
    "Error Message"?: string;
    "Meta Data"?: IAVResultsMetadata;
    "Time Series (1min)"?: any;
    "Time Series (Daily)"?: any;
}

export interface IAVResultsMetadata {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval"?: string;
    "5. Output Size": string;
    "6. Time Zone": string;
}

export interface IAVResultsSeries {
    "1. open": number;
    "2. high": number;
    "3. low": number;
    "4. close": number;
    "5. volume": number;
}