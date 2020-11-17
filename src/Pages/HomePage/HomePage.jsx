import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import WeatherCard from '../../Components/Cards/WeatherCard';
import { cityChecker } from '../../values';
import { Notyf } from 'notyf';
let spawn = require('spawn-password');
import 'notyf/notyf.min.css';
import './index.scss';

let notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top'
    }
});
function HomePage() {
    const [cities, setcities] = useState(['Accra', 'Dallas']);
    const [city, setcity] = useState('');

    let weatherCards = cities.map(city => (
        <Col lg={6} xl={4} key={spawn.spawnAlphaNumeric(20)}>
            <WeatherCard cityName={city} />
        </Col>
    ));

    let handleSubmit = event => {
        event.preventDefault();
        let cityExists = cityChecker(city);

        if (cityExists) {
            setcities(cities.concat([city]));
            notyf.success('City Added');
        } else {
            notyf.error(city + ' is not a valid city name');
        }
    };
    return (
        <div className="main">
            <Container>
                <Row>
                    <Col xs={12} xl={12}>
                        <form onSubmit={handleSubmit}>
                            <div className="Input">
                                <input
                                    type="text"
                                    id="input"
                                    className="form__field"
                                    placeholder="Enter City and hit enter/done, e.g. Accra"
                                    onChange={e => setcity(e.target.value)}
                                />
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row>{weatherCards}</Row>
            </Container>
        </div>
    );
}

export default HomePage;
