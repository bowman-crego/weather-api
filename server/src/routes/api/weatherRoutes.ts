import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
   
  const cityName =req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(cityName);

  res.send(weatherData);
  
  
 
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  console.log(req, res);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  console.log(req, res);
});

export default router;
