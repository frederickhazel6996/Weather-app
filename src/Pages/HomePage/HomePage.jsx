import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import WeatherCard from '../../Components/Cards/WeatherCard';
import { cityChecker, cityAlreadyAdded } from '../../values';
import { useForm } from 'react-hook-form';
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

    const { register, handleSubmit } = useForm();
    let weatherCards = cities.map(city => (
        <Col lg={6} xl={4} key={spawn.spawnAlphaNumeric(20)}>
            <WeatherCard cityName={city} />
        </Col>
    ));

    let submitHandler = data => {
        let cityExists = cityChecker(data.city);
        let _cityAlreadyAdded = cityAlreadyAdded(data.city, cities);

        if (cityExists && !_cityAlreadyAdded) {
            setcities(cities.concat([data.city]));
            notyf.success('City Added');
        } else if (_cityAlreadyAdded) {
            notyf.error(data.city + ' has already been added');
        } else {
            notyf.error(data.city + ' is not a valid city name');
        }
    };
    return (
        <div className="main">
            <Container>
                <Row>
                    <Col xs={12} xl={12}>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="Input">
                                <input
                                    type="text"
                                    id="input"
                                    name="city"
                                    className="form__field"
                                    placeholder="Enter City and hit enter/done, e.g. Accra"
                                    ref={register({
                                        required: true
                                    })}
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
