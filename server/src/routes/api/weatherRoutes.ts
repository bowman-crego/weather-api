import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
   
  const cityName =req.body.cityName;

  if(!cityName){
    res.status(400).send('City name is required');
    return
  }

  try{
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    await HistoryService.getCities();
    res.send(weatherData);
  }catch(err){
    console.error(err);
    res.status(500).send({error: 'Failed to fetch weather data'});
  }

});
  
  
 
  // TODO: GET weather data from city name
  // TODO: save city to search history

// TODO: GET search history
router.get('/history', async (req, res) => {
  const searchHistory = await HistoryService.getCities();
  res.send(searchHistory);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  console.log(req, res);
});

export default router;
