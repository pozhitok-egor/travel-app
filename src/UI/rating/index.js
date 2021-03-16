import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchRating, fetchCountry } from '../../store/actions';
import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';
import { PageLoader } from '../PageLoader/PageLoader';
import Content from '../Content/Content';
import styled from 'styled-components';
import starW from '../../assets/icons/star_fill.svg'
import starD from '../../assets/icons/star_white.svg'
import { Link } from 'react-router-dom';
import User from '../User';

const RowComp = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5]
  return (
    <Row>
      <ImgAndName>
        <img src={`data:image/png;base64,${rating.image.data}`} alt="" />
        <Name>
          { rating.accountUrl ?
            <a href={rating.accountUrl} target="blank">
              {rating.username}
            </a> : rating.username
          }
        </Name>
      </ImgAndName>
      <StarBG>
        {stars.map((star, index) => (
          <ImgWrap key={index}>
            <img src={rating.rating - index > 0 ? starW : starD} alt="" />
          </ImgWrap>
        ))}
      </StarBG>
    </Row>
  )
}

const NameAndCountry = ({ id, lang, country, places }) => {
  const place = places && places.filter((place) => id === place._id)[0];
  return (
    <RowName>
      { place &&
        <h2>
          {place.name[lang]}
        </h2>
      }
      { place &&
        <Link to={`/country/${place.countryId}`}>
          <h2>
            {country && country.name[lang]}
          </h2>
        </Link>
      }
    </RowName>
  )
}

class Rating extends Component {
  componentDidMount() {
    this.props.fetchRating(this.props.match.params.id)
    !this.props.country && this.props.fetchCountry(this.props.match.params.country, this.props.lang)
  }

  render() {
    return (
      <Container>
        <Header><User /></Header>
        <Content>
          {this.props.pageLoader &&
            <PageLoader />
          }
          {!this.props.pageLoader && this.props.ratings &&
            <Content>
              <NameAndCountry lang={this.props.language} country={this.props.country} places={this.props.places} id={this.props.match.params.id} />
              {this.props.ratings.map((rating, index) => (
                <RowComp key={index} rating={rating} />
              ))}
            </Content>
          }
          {!this.props.pageLoader && !this.props.ratings &&
            <Content>
              <h1>
                Unable to find rating.
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
    pageLoader: state.pageLoader.active,
    ratings: state.ratings,
    language: state.language,
    country: state.country,
    places: state.places
  }
}

const mapDispatchToProps = {
  fetchRating,
  fetchCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Rating);

const RowName = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
  color: #262328;
  & a {
    color: #262328;
    text-decoration: underline;
  }
  & h2 {
    margin: 0;
    text-align: center;
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  position: static;
  width: 100%;
  & img {
    width: 30px;
    height: 30px;
  } 
  @media (max-width: 512px) {
    align-items: flex-start;
  }
`

const ImgAndName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  @media (max-width: 512px) {
    width: auto;
    flex-direction: column;
  }
`

const Name = styled.h3`
  & a {
    color: #262328;
    text-decoration: underline;
  }
  @media (max-width: 512px) {
    margin: 10px 0;
    max-width: 90px;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StarBG = styled.div`
  display: flex;
  width: min-content;
  height: min-content;
  @media (max-width: 512px) {
    margin-top: 30px;
    margin-left: 20px;
  }
`

const ImgWrap = styled.div`
  padding: 0 2px 0 2px;
  display: flex;
  align-items: center;
`
