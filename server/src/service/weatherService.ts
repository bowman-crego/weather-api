import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  weatherIcon: string;

  constructor(
    city: string,
    temperature: number,
    humidity: number,
    windSpeed: number,
    uvIndex: number,
    weatherIcon: string
  ) {
    this.city = city;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.uvIndex = uvIndex;
    this.weatherIcon = weatherIcon;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  baseURL: string;
  apiKey: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';

  }

  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    console.log(`~~~~~~~~~~~~~~~~~~~~~${this.baseURL}weather?q=${query}&appid=${this.apiKey}`);
    const response = await fetch(
     `${this.baseURL}weather?q=${query}&appid=${this.apiKey}`
    );
    return await response.json();

  }
  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    return { latitude, longitude};
  }
  // TODO: Create buildWeatherQuery method
  
  private buildWeatherQuery(coordinates: Coordinates): string {
    // console.log("~~~~~~~~~~~~~~~~~~~~~coordinates", coordinates);
    return `${this.baseURL}onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=im`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  
  private parseCurrentWeather(response : any) {
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~response current", response.current);
    const { temp, humidity } = response.current;
    const { speed } = response.wind;
    const { uvi } = response.current;
    const { icon } = response.current.weather[0];
    return new Weather(this.cityName, temp, humidity, speed, uvi, icon);
    
  }
  
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any) {
    const forecastArray = weatherData.daily.map((day: any) => {
      const { temp } = day;
      const { humidity } = day;
      const { speed } = day;
      const { uvi } = day;
      const { icon } = day.weather[0];
      return new Weather(this.cityName, temp, humidity, speed, uvi, icon);
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    // console.log("~~~~~~~~~~~~~~~~~~~~~weatherData", weatherData);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(weatherData);
    return { coordinates, weatherData, currentWeather, forecastArray };
  }
}

export default new WeatherService();
