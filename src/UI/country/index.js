import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import { fetchCountry } from '../../store/actions';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

class Country extends Component {
  componentDidMount() {
    this.props.fetchCountry(this.props.match.params.id)
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <Container>
        <Header></Header>
          <Content>
            { this.props.pageLoader &&
              <PageLoader />
            }
            { !this.props.match.params.id &&
              <Content>
                <h1>
                  Unable to find country
                </h1>
              </Content>
            }
          </Content>
        <Footer />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    pageLoader: state.pageLoader.active
  }
}

const mapDispatchToProps = {
  fetchCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);

