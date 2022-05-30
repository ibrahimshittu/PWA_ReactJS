import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

const fetchWeather = async (city) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    const response = await axios.get(URL, {
        params: {
            q: city,
            APPID: API_KEY,
            units: 'metric'
            }
        });
    return response.data;
}

export default fetchWeather;