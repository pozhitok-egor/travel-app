import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import Search from './Search';
import Select from '../Select';
import { fetchCountries, fetchLanguage } from '../../store/actions';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import User from '../User';
import { withNamespaces } from 'react-i18next';

class Main extends Component {
  componentDidMount() {
    this.props.fetchCountries()
  }

  render() {
    const countries = this.props.search ?
      this.props.countries ?
      this.props.countries.filter((value) => value.capital[this.props.lang].toLowerCase().includes(this.props.search.toLowerCase()) || value.name[this.props.lang].toLowerCase().includes(this.props.search.toLowerCase()))
      : null
      : this.props.countries;
    return (
      <Container>
        <Header><Search /><Select /><User /></Header>
          <Content>
            { this.props.pageLoader &&
              <PageLoader />
            }
            { !this.props.pageLoader && countries &&
              countries.map((country, index) =>
              <Link to={`/country/${country._id}`} key={country._id}>
                <Card image={country.imageUrl}>
                  <Info>
                    <h2>{country.name[this.props.lang]}</h2>
                    <p>{country.capital[this.props.lang]}</p>
                  </Info>
                </Card>
              </Link>
            )
            }
            { !this.props.pageLoader && !countries &&
              <Content>
                <h1>
                  {this.props.t('no_countries')}
                </h1>
              </Content>
            }
          </Content>
        <Footer />
      </Container>
    )
  }
}

const Card = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 30px 0;
  padding: 15px;
  width: 250px;
  height: 170px;
  border-radius: 25px;
  background: ${(({image}) => `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url(${image})`)};
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  background-size: cover;
  transform: perspective(500px);
  transition: .3s ease-in-out;
  &:hover {
    transform: perspective(500px) rotateX(10deg) scale(1.1);
    transition: .3s ease-in-out;
  }
`;

const Info = styled.div`
  color: #EFF2F3;
  text-decoration: none;
`;


const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    pageLoader: state.pageLoader.active,
    search: state.search,
    lang: state.language
  }
}

const mapDispatchToProps = {
  fetchCountries,
  fetchLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Main));
