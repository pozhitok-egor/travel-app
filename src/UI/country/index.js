import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import { fetchCountry } from '../../store/actions';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
import styled from 'styled-components';
import Description from './Description';
import Gallery from './Gallery';
import Video from './Video';
import DateTime from './DateTime';
import Weather from './Weather';
import Currency from './Currency';
import Map from './Map';

class Country extends Component {
  componentDidMount() {
    this.props.fetchCountry(this.props.match.params.id)
  }

  render() {
    return (
      <Container>
        <Header></Header>
            { this.props.pageLoader &&
              <PageLoader />
            }
            { !this.props.pageLoader && this.props.country &&
            <Content>
              <MainBlock>
                <h1>{this.props.country.name}</h1>
                <p>{this.props.country.capital}</p>
                <Description />
                <Gallery />
                <Video />
              </MainBlock>
              <Sidebar>
                <DateTime />
                <Weather />
                <Currency />
                <Map />
              </Sidebar>
            </Content>
            }
            { !this.props.pageLoader && !this.props.country &&
              <Content>
                <h1>
                  Unable to find country
                </h1>
              </Content>
            }
        <Footer />
      </Container>
    )
  }
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  width: calc(70% - 20px);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  width: calc(30% - 20px);
`;

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    pageLoader: state.pageLoader.active,
    country: state.country
  }
}

const mapDispatchToProps = {
  fetchCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);

