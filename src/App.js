import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"
function App() {
  let [location, setLocation] = useState("");
  let [weatherData, setData] = useState("");
  let [errMsg, setErrMsg] = useState("");
  const api = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=e23dd80848c5ec996845fc1863a13704"
  const searchLocation = async (e) => {
    setErrMsg("");
    setData("");
    try {
      if (e.key == 'Enter') {
        let response = await axios.get(api);
        if ('data' in response) {
          setData(response.data);
        }
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.response.data.message)
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      {
        weatherData
          ?
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{weatherData?.name ? weatherData.name : "N/A"}</p>
              </div>
              <div className="temp">
                <h1>{weatherData?.main ? weatherData.main.temp : "N/A"}°F</h1>
              </div>
              <div className="description">
                <p>{weatherData?.weather ? weatherData.weather[0].description : "N/A"}</p>
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                <p className='bold'>{weatherData?.main ? weatherData.main.feels_like : "N/A"}°F</p>
                <p className="bottom-title">Feels Like</p>
              </div>
              <div className="humidity">
                <p className='bold'>{weatherData?.main ? weatherData.main.humidity : "N/A"}%</p>
                <p className="bottom-title">Humidity</p>
              </div>
              <div className="wind">
                <p className='bold'>{weatherData?.wind ? weatherData.wind.speed : "N/A"} MPH</p>
                <p className="bottom-title">Wind Speed</p>
              </div>
            </div>
          </div> :
          errMsg ?
            <div className="msg">
              <div>
                <p className="msg-title">{errMsg}</p>
              </div>
            </div>
            :
            <div className="msg">
              <div>
                <p className="msg-title">please search city or Location for weather report.</p>
              </div>
            </div>


      }
    </div>
  );
}

export default App;