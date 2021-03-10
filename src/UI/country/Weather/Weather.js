import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageLoader } from '../../PageLoader/PageLoader';
import weatherFon from '../../../assets/weatherFon.svg';

const ICONS = {
  cloudRainLightning: ['t01d', 't01n', 't02d', 't02n', 't03d', 't03n'],
  cloudLightning: ['t04d', 't04n', 't05d', 't05n'],
  snow: ['d01d', 'd01n', 'd02d', 'd02n', 'd03d', 'd03n', 's01d', 's01n', 's02d', 's02n', 's03d', 's03n', 's04d', 's04n', 's05d', 's05n', 's06d', 's06n'],
  rain: ['r01d', 'r01n', 'r02d', 'r02n', 'r03d', 'r03n', 'r04d', 'r04n', 'r05d', 'r05n', 'r06d', 'r06n', 'f01d', 'f01n', 'u00d', 'u00n'],
  cloud: ['a01d', 'a01n', 'a02d', 'a02n', 'a03d', 'a03n', 'a04d', 'a04n', 'a05d', 'a05n', 'a06d', 'a06n', 'c04d', 'c04n'],
  sun: ['c01d'],
  moon: ['c01n'],
  cloudSun: ['c02d', 'c03d'],
  cloudMoon: ['c02n', 'c03n'],
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
  const [data, setData] = useState(false);
  
  useEffect(() => {
    const key = 'dca4631c560946108f0219caaf5b59d7';
    const lat = props.country.capitalLocation.coordinates[1];
    const lon = props.country.capitalLocation.coordinates[0];
    const lang = 'en';

    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}&lang=${lang}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data[0]);
      });
  }, []); 


  return (
    <WeatherBlock>
      { !data &&
        <PageLoader />
      }
      { data &&
        <div className='wrap'>
          <div className='info'>
            <div className='text'>{props.country.capital}</div>
            <div className='temp'>{`${Math.ceil(data.temp)}°`}</div>
            <div className='text'>{data.weather.description}</div>
          </div>
          <div className='icon'>
            <img height="50" width="50" alt={data.weather.description} src={`${process.env.PUBLIC_URL}/weather/${getIcon(data.weather.icon)}`} />
          </div>
        </div>
      }
    </WeatherBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
  }
}

export default connect(mapStateToProps, null)(Weather);

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
