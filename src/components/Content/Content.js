import React, { useState } from 'react';
import axios from 'axios';

import ActualWeatherResult from "../ActualWeatherResult/ActualWeatherResult";
import ForecastWeatherResult from "../ForecastWeatherResult/ForecastWeatherResult";
import Form from '../Form/Form';
import './Content.scss';


const API_KEY_ACTUAL = process.env.REACT_APP_API_KEY_ACTUAL;
const API_KEY_FORECAST = process.env.REACT_APP_API_KEY_FORECAST;

const date = new Date().toLocaleDateString("pl", {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: "numeric",
    minute: "numeric"
});

const Content = () => {
    //form state    
    const [inputCityValue, setInputCityValue] = useState('');
    //actualweather state
    const [description, setDescription] = useState([]);
    const [humidity, setHumidity] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [temp, setTemp] = useState('');
    const [tempFeelsLike, setTempFeelsLike] = useState('');
    const [wind, setWind] = useState(null);
    //forecast state
    const [days, setDays] = useState([]);
    const [forecastTemp, setForecastTemp] = useState([]);
    const [hours, setHours] = useState([]);
    const [icons, setIcons] = useState([]);
    const [precipitation, setPrecipitation] = useState([]);
    //errors state
    const [isError, setIsError] = useState("");


    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    const API_URL_ACTUAL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&lang=pl&appid=${API_KEY_ACTUAL}&units=metric`;

    const API_URL_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?q=${inputCityValue}&lang=pl&appid=${API_KEY_FORECAST}&units=metric`


    const getActualWeather = () => {
        axios.get(API_URL_ACTUAL)
            .then(response => {
                // console.log(response);
                const { data } = response;

                const weatherInfo = data.weather.map(item => item.description);
                setDescription(weatherInfo);
                setHumidity(data.main.humidity);
                setTemp(data.main.temp);
                setTempFeelsLike(data.main.feels_like)
                setWind(data.wind.speed);

                setSunrise(data.sys.sunrise);
                setSunset(data.sys.sunset);

                setIsError("no-actual")
            })
            .catch(error => {
                const { response } = error;
                console.log(response);

                setIsError("yes");
            })
    };

    const getForecastWeather = () => {
        axios.get(API_URL_FORECAST)
            .then(response => {
                console.log(response);
                const { data } = response;

                const days = data.list.map(item => item.dt_txt.slice(0, 10));
                setDays(days);

                const hours = data.list.map(item => item.dt_txt.slice(11, 16));
                setHours(hours);

                const fore_temp = data.list.map(item => Math.round(item.main.temp));
                setForecastTemp(fore_temp);

                const icons = data.list.map(item => item.weather[0].icon)
                setIcons(icons)

                const precipitations = data.list.map(item => item.pop)
                setPrecipitation(precipitations)

                setIsError("no-forecast");

            })
            .catch(error => {
                console.log(error);
                setIsError("yes");
            })
    }

    const resetInput = () => {
        setInputCityValue("")
    };

    const handleChangeCity = ({ target: { value } }) => {
        setInputCityValue(value)
    };

    const showResult = () => {
        if (isError === "yes") return <p className="error-message">Przepraszamy. Nie ma takiego miasta</p>;
        else if (isError === "no-actual") return <ActualWeatherResult description={description} humidity={humidity} sunriseTime={sunriseTime} sunsetTime={sunsetTime} temp={temp} tempFeelsLike={tempFeelsLike} wind={wind} />;
        else if (isError === "no-forecast") return <ForecastWeatherResult days={days} forecastTemp={forecastTemp} hours={hours} icons={icons} precipitation={precipitation} />;
        else if (isError === "") return null
    }
    let result = showResult();


    const handleActualClick = () => {
        getActualWeather();
        resetInput();
        showResult();
    };

    const handleForecastClick = () => {
        getForecastWeather();
        resetInput();
        showResult();
    }

    return (
        <main>
            <h1>Pogoda w Twoim mieście</h1>
            <p className="today"> {date} </p>
            <Form city={inputCityValue} handleChangeCity={handleChangeCity} handleActualClick={handleActualClick} handleForecastClick={handleForecastClick} />
            {result}
        </main>
    );
}

export default Content;