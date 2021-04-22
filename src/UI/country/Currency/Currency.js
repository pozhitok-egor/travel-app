import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { PageLoader } from '../../PageLoader/PageLoader';
import { fetchCurrency } from '../../../store/actions';
import { withNamespaces } from 'react-i18next';

const Currency = (props) => {
  function prepCurrency(currency) {
    if (currency === props.country.currency) {
      return (currency === 'RUB') ? 100 : 1;
    }
    if(currency !== 'RUB' && props.country.currency === 'RUB') {
      return Math.trunc(1/props.currency.rates[currency] * 100) / 100;
    }
    const rates = (currency === 'RUB')
      ? props.currency.rates[props.country.currency] * 100
      : props.currency.rates[props.country.currency] / props.currency.rates[currency];
    return Math.trunc(rates * 100) / 100;
  }

  return (
    <CurrencyBlock>
      { !props.currency &&
        <PageLoader />
      }
      { props.currency && (props.country.currency in props.currency.rates || props.country.currency === 'RUB') &&
        <CurrencyWrap>
          <CurrencyName>
            { props.country.currency }
          </CurrencyName>
          <CurrencyItem>
            <div>1 USD</div>
            <div>{prepCurrency('USD')}</div>
          </CurrencyItem>
          <CurrencyItem>
            <div>1 EUR</div>
            <div>{prepCurrency('EUR')}</div>
          </CurrencyItem>
          <CurrencyItem>
            <div>100 RUB</div>
            <div>{prepCurrency('RUB')}</div>
          </CurrencyItem>
        </CurrencyWrap>
      }
      { props.currency && (!(props.country.currency in props.currency.rates) && props.country.currency !== 'RUB') &&
        <CurrencyWrap>
          <CurrencyName>
            {props.t('no_currancy')} {props.country.currency}
          </CurrencyName>
        </CurrencyWrap>
      }
    </CurrencyBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
    currency: state.currency
  }
}

const mapDispatchToProps = {
  fetchCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Currency));

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

const CurrencyName = styled.div`
  text-align: center;
  font-family: Balsamiq Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 23px;
  color: #EFF2F3;
`


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
