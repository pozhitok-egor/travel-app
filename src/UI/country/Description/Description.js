import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

const Description = (props) => {
  return (
    <DescriptionBlock>
      <Image src={props.country.imageUrl} alt={props.country.name[props.lang]}/>
      <Text>
        {props.country.description[props.lang]}
      </Text>
    </DescriptionBlock>
  )
}

const mapStateToProps = (state) => {
  return {
    country: state.country,
    lang: state.language
  }
}

const DescriptionBlock = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 10px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Image = styled.div`
  background: url(${({src}) => src});        background-size: cover;
  min-width: 300px;
  height: 200px;
  border-radius: 25px;
`;

const Text = styled.p`
  text-align:left;
  width: 450px;
`;


export default connect(mapStateToProps, null)(Description);
