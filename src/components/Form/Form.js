import React from 'react';

import './Form.scss'

const Form = ({ city, handleChangeCity, handleActualClick, handleForecastClick }) => {
    return (
        <div className="form">
            <div className="input">
                <label htmlFor="city" >
                    Miasto:
            <input type="text" placeholder="wpisz miasto" value={city} onChange={handleChangeCity} id="city" />
                </label>
            </div>
            <div className="buttons">
                <button type="submit" onClick={handleActualClick}>AKTUALNA POGODA</button>
                <button type="submit" onClick={handleForecastClick}>PROGNOZA GODZINOWA</button>
            </div>
        </div>
    );
}

export default Form;