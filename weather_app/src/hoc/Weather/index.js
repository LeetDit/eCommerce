import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

import Forecast from '../../components/Forecast';
import Today from '../../components/Today';

class Weather extends Component {

    state = {
        currentCity: '',
        currentLat: '',
        currentLon: '',
        today: [],
        forecast: [],
    }

    items = [
        {
            city: "Toronto",
            lat: "43.651070",
            lon: "-79.347015",
        },
        {
            city: "Vancouver",
            lat: "49.2827",
            lon: "-123.1207",
        },
        {
            city: "Calgary",
            lat: "51.0447",
            lon: "-114.0719",
        },
    ]

    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    componentDidMount() {
        this.setState({
            currentCity: this.items[0].city,
            currentLat: this.items[0].lat,
            currentLon: this.items[0].lon,
        }, () => {
            this.loadItem();
        })
    }

    selectCity = (city) => {
        this.items.map((item) => (
            item.city === city ? 
                this.setState({
                    currentCity: item.city,
                    currentLat: item.lat,
                    currentLon: item.lon,
                }, () => {
                    this.loadItem();
                })
            : null
        ))
    }

    loadItem = () => {
        axios.get(`${process.env.REACT_APP_API_URL}?lat=${this.state.currentLat}&lon=${this.state.currentLon}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            this.setState({today: res.data.current})
            this.setState({forecast: res.data.daily});
        });
    }

    loadCity = () => {
        return this.items.map((item, i) => (
            <div
                key={i}
                className="col"
                style={{
                    color: item.city === this.state.currentCity ? "#5FB0E8" : "#333339",
                    fontWeight: item.city === this.state.currentCity ? "bold" : "light",
                    fontSize: "1.5em",
                    cursor: "pointer",
                }}
                onClick={() => this.selectCity(item.city)}
            >
                {item.city}
            </div>
        ))
    }

    showForecast = () => {
        let setDate = new Date();
        return this.state.forecast.map((item, i) => (
            i < 4 ? 
                <Forecast
                    key={i}
                    i={i} 
                    day={this.days[setDate.getDay()+1+i]}
                    icon={item.weather[0].icon}
                    temp={item.temp.day}
                />
            : null
        ))
    }

    showToday = () => {
        return (
            <div className="col p-3">
                <div className="todayTitleText">Today</div>
                {this.state.today.weather && this.state.today.temp ?
                    <Today 
                        temp={this.state.today.temp}
                        weather={this.state.today.weather[0].main}
                        icon={this.state.today.weather[0].icon}
                    />
                : null}
            </div>
        )
    }

    render() {
        return (
            <>
                <div className="w-50 mx-auto my-5 detailText">
                    <div className="container w-75 my-3">
                        <div className="row text-center text-uppercase">
                            {this.loadCity()}
                        </div>
                    </div>

                    <div className="container shadow-lg outerBorder">
                        <div className="row text-center py-3">
                            {this.showToday()}
                        </div>
                        <div className="row text-center forecastBorder">
                            {this.showForecast()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Weather;