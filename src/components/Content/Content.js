import React, { useState } from 'react';
import axios from 'axios';

import ActualWeatherResult from "../ActualWeatherResult/ActualWeatherResult";
import Form from '../Form/Form';
import './Content.scss';


const API_KEY = process.env.REACT_APP_API_KEY;

const date = new Date().toLocaleDateString("pl", {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: "numeric",
    minute: "numeric"
});

const Content = () => {
    const [inputCityValue, setInputCityValue] = useState('');

    const [description, setDescription] = useState([]);
    const [humidity, setHumidity] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [temp, setTemp] = useState('');
    const [tempFeelsLike, setTempFeelsLike] = useState('');
    const [wind, setWind] = useState(null);

    const [isError, setIsError] = useState("");

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputCityValue}&lang=pl&appid=${API_KEY}&units=metric`;



    const getActualWeather = () => {
        axios.get(API_URL)
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

                setIsError("no")
            })
            .catch(error => {
                const { response } = error;
                console.log(response);

                setIsError("yes");
            })
    };

    const resetInput = () => {
        setInputCityValue("")
    };

    const handleChangeCity = ({ target: { value } }) => {
        setInputCityValue(value)
    };

    const showResult = () => {
        if (isError === "yes") return <p className="error-message">Nie ma takiego miasta</p>;
        else if (isError === "no") return <ActualWeatherResult description={description} humidity={humidity} sunriseTime={sunriseTime} sunsetTime={sunsetTime} temp={temp} tempFeelsLike={tempFeelsLike} wind={wind} />;
        else if (isError === "") return null
    }
    let result = showResult();


    const handleActualClick = () => {
        getActualWeather();
        resetInput();
        showResult();
    };

    return (
        <main>
            <h1>Pogoda w Twoim mieście</h1>
            <p className="today"> {date} </p>
            <Form city={inputCityValue} handleChangeCity={handleChangeCity} handleActualClick={handleActualClick} />
            {result}
        </main>
    );
}

export default Content;