import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup, Layer, Source } from 'react-map-gl';
import { connect } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import point from '../../../assets/icons/location-icon.svg';
import fullScreenClose from '../../../assets/icons/fullscreen-exit.svg';
import fullScreenOpen from '../../../assets/icons/fullscreen-open.svg';

const Map = (props) => {

  const [fullScreen, setFullScreen] = useState(false);

  const setCountryLang = (lang) => {
    switch (lang) {
      case 'ru': return 'mapbox://styles/jorra/ckly7vq3v71nz17ptfu4tz8wq'
      case 'en': return 'mapbox://styles/jorra/cklxlwad56g5j17qk03zubl6z'
      default: return 'mapbox://styles/jorra/cklz1mq2b384917t8gmb32xkc'
    }
  }
  const setToken = (lang) => {
    switch (lang) {
      case 'ru': return 'pk.eyJ1Ijoiam9ycmEiLCJhIjoiY2tseGxiZHZtMGpmbDJzbHl0cHV1aHg4aiJ9.t5iXtQJoPaoHebkc60dMVA'
      case 'en': return 'pk.eyJ1Ijoiam9ycmEiLCJhIjoiY2tseGxraDl1MGpxMjJ4bHlsZGkwcGl1ZSJ9.tcDoq_ME1z52aIxpT0AXqQ'
      default: return 'pk.eyJ1Ijoiam9ycmEiLCJhIjoiY2tseGxiZHZtMGpmbDJzbHl0cHV1aHg4aiJ9.t5iXtQJoPaoHebkc60dMVA'
    }
  }

  const mapToken = setToken(props.lang)
  const mapStyle = setCountryLang(props.lang)
  
  const [viewport, setViewport] = useState({
    latitude: props.country.capitalLocation.coordinates[1],
    longitude: props.country.capitalLocation.coordinates[0],
    zoom: 4,
    maxZoom: 17,
    minZoom: 3
  });

  const [selectedCapital, setSelectedCapital] = useState(false)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setSelectedCapital(false)
      if (fullScreen) {
        setFullScreen(false)
      }
    }
  });

  const layerStyle = {
    id: 'point',
    type: 'line',
    paint: {
      "line-color": "#f44336",
      "line-gap-width": 2
    }
  };

  return (
    <FullMap fullScreen={fullScreen}>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='100%'
        mapboxApiAccessToken={mapToken}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle={mapStyle}
      >

        <Marker
          latitude={props.country.capitalLocation.coordinates[1]}
          longitude={props.country.capitalLocation.coordinates[0]}
        >
          <Point size={viewport.zoom} onClick={e => {
            e.preventDefault()
            setSelectedCapital(true)
          }}>
            <img src={point} alt='location icon' />
          </Point>
        </Marker>

        {selectedCapital ? (
          <Popup latitude={props.country.capitalLocation.coordinates[1]}
            longitude={props.country.capitalLocation.coordinates[0]}
            onClose={e => { setSelectedCapital(false) }}>
            <div>
              {props.country.name + ', ' + props.country.capital}
            </div>
          </Popup>
        ) : null}

        <Source id="my-data" type="geojson" data={props.country.border}>
          <Layer {...layerStyle} />
        </Source>
        <FullScreenButton onClick={(e) => setFullScreen(!fullScreen)}>
          <img src={ fullScreen ? fullScreenClose : fullScreenOpen} alt="Full screen"/>
        </FullScreenButton>
      </ReactMapGL>
    </FullMap>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
    lang: state.lang || 'ru'
  }
}


export default connect(mapStateToProps, null)(Map);

const FullMap = styled.div`
  position: ${({fullScreen}) => fullScreen ? 'fixed' : 'relative'};
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: ${({fullScreen}) => fullScreen ? '0px' : '25px'};
  width: ${({fullScreen}) => fullScreen ? '100vw' : '100%'};
  height: ${({fullScreen}) => fullScreen ? '100vh' : '170px'};
  z-index: 10;
`

const FullScreenButton = styled.button`
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: none;
  background: transparent;
  & img { 
    width: 200%;
    height: 200%;
  }
`;

const Point = styled.div`
  position: relative;
  & img{
    position: absolute;
    top: ${props => -props.size * 6}px;
    left: ${props => -props.size * 3}px;
    width: ${props => props.size * 6}px;
    height: ${props => props.size * 6}px;
    cursor: pointer;
  }
`
