import React, { useEffect, useState } from 'react';
import './index.scss';
import { Container, Row, Col } from 'react-bootstrap';
import {
    RainImage,
    RainIcon,
    SunImage,
    SunIcon,
    CloudIcon,
    CloudImage,
    StormIcon,
    StormImage,
    ExtremeIcon,
    ExtremeImage,
    MistIcon,
    MistImage,
    SnowIcon,
    SnowImage
} from '../../values';
import RPT from 'prop-types';
import axios from 'axios';

let url = 'https://api.openweathermap.org/data/2.5/weather';
const WeatherCard = ({ cityName }) => {
    const [temperature, settemperature] = useState('');
    const [weathertype, setweathertype] = useState('');
    const [weatherdescription, setweatherdescription] = useState('');
    const [image, setimage] = useState('');
    useEffect(() => {
        axios
            .get(
                url,
                {
                    params: {
                        q: cityName.toLowerCase(),
                        appid: process.env.REACT_APP_API_KEY,
                        units: 'metric'
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                let weather = response.data;
                settemperature(weather.main.temp);
                // setweathertype(weather.weather[0].main);
                weather.weather[0].main === 'Thunderstorm'
                    ? setimage({ image: StormImage, icon: StormIcon })
                    : weather.weather[0].main === 'Clouds'
                    ? setimage({ image: CloudImage, icon: CloudIcon })
                    : weather.weather[0].main === 'Rain'
                    ? setimage({ image: RainImage, icon: RainIcon })
                    : weather.weather[0].main === 'Snow'
                    ? setimage({ image: SnowImage, icon: SnowIcon })
                    : weather.weather[0].main === 'Clear'
                    ? setimage({ image: SunImage, icon: SunIcon })
                    : { image: MistImage, icon: MistIcon };
                setweatherdescription(weather.weather[0].description);
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        console.log(error.response);
                    } else {
                        console.log(error.response);
                    }
                }
            });
    }, []);
    return (
        <div className="card mt-5">
            <img src={image.image} className="card-image" />
            <Container fluid>
                <Row>
                    <Col>
                        <h3 className="text-center mt-3 city-name">
                            {cityName}
                        </h3>
                        <img src={image.icon} className="card-icon mt-3" />
                        <h3 className="text-center mt-3">
                            {temperature}
                            <span>&#176;</span>C
                        </h3>
                        <h3 className="text-center mt-3 mb-5 description">
                            {weatherdescription}
                        </h3>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

WeatherCard.propTypes = {
    cityName: RPT.string
};

export default WeatherCard;
