import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageLoader } from '../../PageLoader/PageLoader';
import weatherFon from '../../../assets/weatherFon.svg';
import { fetchWeather } from '../../../store/actions';

const ICONS = {
  cloudRainLightning: ['11d','11n'],
  cloudLightning: ['11d','11n'],
  snow: ['13d', '13n'],
  rain: ['10d', '09d', '10n', '09n'],
  cloud: ['03d', '03n', '04d', '04n'],
  sun: ['01d'],
  moon: ['01d'],
  cloudSun: ['02d', '03d'],
  cloudMoon: ['02n', '03n'],
};

function getIcon(code) {
  const keys = Object.keys(ICONS);

  let icon;
  keys.forEach((key) => {
    if (ICONS[key].indexOf(code) !== -1) icon = key;
  });
  return `${icon}.svg`;
}

const Weather = (props) => {
  return (
    <WeatherBlock>
      { !props.weather &&
        <PageLoader />
      }
      { props.weather &&
        <div className='wrap'>
          <div className='info'>
            <div className='text'>{props.country.capital[props.lang]}</div>
            <div className='temp'>{`${Math.ceil(props.weather.main.temp-273.15)}°`}</div>
            <div className='text'>{props.weather.weather[0].description}</div>
          </div>
          <div className='icon'>
            <img height="50" width="50" alt={props.weather.weather.description} src={`${process.env.PUBLIC_URL}/weather/${getIcon(props.weather.weather[0].icon)}`} />
          </div>
        </div>
      }
    </WeatherBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
    lang: state.language,
    weather: state.weather
  }
}

const mapDispatchToProps = {
  fetchWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

const WeatherBlock = styled.div`
  margin-bottom: 10px;

  & .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;

    background:
      url('${weatherFon}') center/cover no-repeat,
      linear-gradient(360deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%), #1E5686;
    border-radius: 25px;
  }

  & .info {
    font-family: Balsamiq Sans;
    font-style: normal;
    font-weight: bold;
    color: #EFF2F3;

    & .text {
      font-size: 19px;
      line-height: 23px;
    }
    & .temp {
      font-size: 32px;
      line-height: 38px;
    }
  }
`;
