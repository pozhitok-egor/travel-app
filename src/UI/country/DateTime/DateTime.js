import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

function getDate(locale, timezone) {
  const date = new Date();

  const objDate = {
    day: date.toLocaleString(locale, { day: '2-digit', timeZone: timezone }),
    weekday: date.toLocaleString(locale, { weekday: 'short', timeZone: timezone }),
    month: date.toLocaleString(locale, { month: 'long', timeZone: timezone }),
  };

  return objDate;
}

function getTime(locale, timezone) {
  const date = new Date();

  const objTime = {
    hour: date.toLocaleString(locale, { hour: 'numeric', timeZone: timezone, hour12: false }),
    minute: date.toLocaleString(locale, { minute: 'numeric', timeZone: timezone }),
    second: date.toLocaleString(locale, { second: 'numeric', timeZone: timezone }),
  };

  objTime.hour = (objTime.hour > 23) ? `00` : `${objTime.hour}`; //прикол
  objTime.minute = (objTime.minute < 10) ? `0${objTime.minute}` : `${objTime.minute}`;
  objTime.second = (objTime.second < 10) ? `0${objTime.second}` : `${objTime.second}`;

  return objTime;
}



const DateTime = (props) => {

  const [date, setDate] = useState(getDate('en-EN', 'Europe/Rome')); //тут везде на вход дать локаль и таймзону как появятся
  const [time, setTime] = useState(getTime('en-EN', 'Europe/Rome'));

  useEffect(() => {
    const counter = setInterval(() => {
      setTime(getTime('en-EN', 'Europe/Rome'));
    }, 1000);

    return () => clearInterval(counter);
  }, [time]);

  return (
    <DateTimeWrap>
      <DateTimeTitle>Date & time:</DateTimeTitle>
      <TimeWrap>
        <span>{time.hour[0]}</span>
        <span>{time.hour[1]}</span>
        :
        <span>{time.minute[0]}</span>
        <span>{time.minute[1]}</span>
        :
        <span>{time.second[0]}</span>
        <span>{time.second[1]}</span>
      </TimeWrap>
      <DateWrap>{`${date.weekday}, ${date.day} ${date.month}`}</DateWrap>
    </DateTimeWrap>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
  }
}

export default connect(mapStateToProps, null)(DateTime);

const DateTimeWrap =  styled.div`
  margin-bottom: 10px;
`;

const DateTimeTitle =  styled.div`
  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 38px;
  margin-bottom: 10px;
`;

const TimeWrap =  styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 59px;

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
  }
`;

const DateWrap =  styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 19px;
  line-height: 23px;
`;
