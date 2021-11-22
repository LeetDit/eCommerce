import React from 'react';
import './styles.css';

const Today = (props) => {

    return (
        <>
            <div className="row justify-content-center">
                <div className="col">
                    <img className="float-end" alt="weather" src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`} />
                </div>
                <div className="col pt-5">
                    <div className="text-start">
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