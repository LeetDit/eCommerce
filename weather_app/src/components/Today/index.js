import React from 'react';
import './styles.css';

const Today = (props) => {

    return (
        <>
            <div className="row justify-content-center">
                <div className="col">
                    <img className="float-end" alt="weather" src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} />
                </div>
                <div className="col">
                    <div className="float-start text-start">
                        <div className="todayText">
                            {Math.round(props.temp)}&deg;
                        </div>
                        <div className="weatherText">
                            {props.weather}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Today;