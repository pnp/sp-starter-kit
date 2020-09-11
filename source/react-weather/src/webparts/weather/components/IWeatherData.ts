export interface IWeatherData {
    coord: IWeatherLocation;
    weather: [IWeatherDescription];
    main: IWeatherCondition;
    timezone: number;
    name: string;
}

export interface IWeatherLocation {
    lon: number;
    lat: number;
}

export interface IWeatherDescription {
    main: string;
    description: string;
    icon: string;
}

export interface IWeatherCondition {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;

}