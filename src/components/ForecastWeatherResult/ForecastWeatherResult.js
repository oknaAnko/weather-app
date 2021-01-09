import React from 'react';
import './ForecastWeatherResult.scss';

const ForecastWeatherResult = ({ days, forecastTemp, hours, icons, precipitation }) => {
    let indexTab = []
    hours.forEach((hour, index) => {
        if (hour === "00:00") {
            indexTab.push(index)
        }
    });

    const dayShowed = days.map((day, idx) => {
        for (const i of indexTab) {
            if (idx === i) {
                return <div className="visible" key={idx}>{day}</div>
            }
        }
        return <div className="not-visible" key={idx}>{day}</div>;

    });

    const hourShowed = hours.map((hour, idx) => <div key={idx}>{hour}</div>);

    const forecastTempShowed = forecastTemp.map((temp, idx) => <div key={idx}>{temp}</div>);

    const iconShowed = icons.map((icon, idx) => (
        <div className="icon" key={idx}>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />

        </div>
    ));

    const precipitationShowed = precipitation.map((precipitation, idx) => <div key={idx}>{precipitation} %</div>);


    return (
        <div>
            <div className="result-container">
                <div className="days">
                    <h3>Dzień</h3>
                    {dayShowed}
                </div>
                <div className="hours">
                    <h3>Godz.</h3>
                    {hourShowed}
                </div>
                <div className="temp">
                    <h3>&#176;C</h3>
                    {forecastTempShowed}
                </div>
                <div className="icons">
                    {iconShowed}
                </div>
                <div className="precipitations">
                    <h3>Opady</h3>
                    {precipitationShowed}
                </div>

            </div>
        </div >
    );
}

export default ForecastWeatherResult;