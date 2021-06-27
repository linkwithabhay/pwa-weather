import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(baseURL, {
    params: {
      q: query,
      units: "metric",
      appid:
        process.env.REACT_APP_API_KEY || "f33a484cf794d08d0148764789aaba32",
    },
  });

  return data;
};
