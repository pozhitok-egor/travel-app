import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageLoader } from '../../PageLoader/PageLoader';

const Currency = (props) => {
  const [currency, setCurrency] = useState(false);
  
  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${props.country.currency}`)
      .then(response => response.json())
      .then(data => {
        setCurrency(data);
      });
  }, []); 

  return (
    <CurrencyBlock>
      { !currency &&
        <PageLoader />
      }
      { currency &&
        <CurrencyWrap>
          <CurrencyItem>
            <div>1 USD</div>
            <div>{(props.country.currency === 'USD') ? '1' : currency.rates.USD.toFixed(2)}</div>
          </CurrencyItem>
          <CurrencyItem>
            <div>1 EUR</div>
            <div>{(props.country.currency === 'EUR') ? '1' : currency.rates.EUR.toFixed(2)}</div>
          </CurrencyItem>
          <CurrencyItem>
            <div>100 RUB</div>
            <div>{(props.country.currency === 'RUB') ? '100' : (currency.rates.RUB / 100).toFixed(2)}</div>
          </CurrencyItem>
        </CurrencyWrap>
      }
    </CurrencyBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
  }
}

export default connect(mapStateToProps, null)(Currency);

const CurrencyBlock = styled.div`
  margin-bottom: 10px;
`;

const CurrencyWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  background: #5E6381;
  border-radius: 25px;
`;

const CurrencyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 23px;
  color: #EFF2F3;

  &:last-child {
    margin-bottom: 0;
  }
`;
