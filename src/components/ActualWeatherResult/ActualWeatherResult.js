import React from 'react';
import './ActualWeatherResult.scss';


const ActualWeatherResult = ({ description, humidity, sunriseTime, sunsetTime, temp, tempFeelsLike, wind }) => {
    return (
        <div className="results">
            <p className="sun">wschód słońca: <span>{sunriseTime}</span> - zachód słońca: <span>{sunsetTime}</span></p>
            <p className="description"> {description}</p>
            <p className="actual-temp"><span>{temp} &#176;C</span></p>
            <p> Temperatura odczuwalna: <span> {tempFeelsLike} &#176;C</span></p>
            <p> Wilgotność: <span>{humidity} %</span></p>
            <p> Wiatr: <span>{wind} m/s</span></p>
        </div>
    );
}

export default ActualWeatherResult;