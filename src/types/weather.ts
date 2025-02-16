export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  precipitation: number;
  description: string;
  icon: string;
}

export interface HistoricalData {
  timestamp: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export type TimeRange = '1d' | '7d' | '30d';