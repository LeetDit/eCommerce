import React from 'react';
import './styles.css';

const Forecast = (props) => {

    return (
        <>
            <div className="col p-3" style={{borderRight: props.i < 3 ? "3px solid white" : ""}}>
                <div>
                    {props.day}
                </div>
                <div>
                    <img alt="weather" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
                </div>
                <div className="forecastText">
                    {Math.round(props.temp)}&deg;
                </div>
            </div>
        </>
    )
}

export default Forecast;