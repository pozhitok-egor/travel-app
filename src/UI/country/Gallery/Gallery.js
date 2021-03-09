import React, {useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { connect } from 'react-redux';
import styled from 'styled-components';

const settingsInit = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true
      }
    }]
};

const Gallery = (props) => {
  const [settings,setSettings] = useState(settingsInit);
  const handle = useFullScreenHandle();
  const handleClickImg = ()=> {
    if(!handle.active) handle.enter(); 
    else return 0
  }

  const handleChangeFullScrenn =(state)=> {
    if(window.innerWidth> 700) {
      if(state) setSettings(prev=>{return {...prev, slidesToShow:1,  nextArrow: <SampleNextArrow isFullScren={true}/>, prevArrow: <SamplePrevArrow isFullScren={true}/>}})
      else setSettings(prev=>{return {...prev, slidesToShow:2,  nextArrow: <SampleNextArrow isFullScren={false}/>, prevArrow: <SamplePrevArrow isFullScren={false}/> }})
    }
  }
  
  return (
    <GalleryBlock>
      <div>Gallery</div>     
      <FullScreen handle={handle} onChange={handleChangeFullScrenn}>
        <Slider {...settings}>
        {props.places.map((el,i) => {
          return <GalleryItem key={i} isFullScren={handle.active}>
            <GalleryItemImg src={el.photoUrl} alt={el.name} onClick={handleClickImg} isFullScren={handle.active}></GalleryItemImg>
            <Name>{el.name}</Name>
            {handle.active ?<Description isFullScren={handle.active}>{el.description}</Description>: null}
          </GalleryItem>
        })}
        </Slider>
        {handle.active ? <ExitButton onClick={handle.exit}></ExitButton> : null}
      </FullScreen>
    </GalleryBlock>    
  )
}

const GalleryBlock =styled.div`
margin: 15px 0 30px;
`;
const GalleryItem =styled.div`
height: ${({isFullScren}) => isFullScren ? '70vh' : '200px' };
`;
const GalleryItemImg =styled.img`
max-height: 100%;
margin: 0 auto;
max-width: 98%;
border-radius: 10px;
cursor: ${({isFullScren}) => isFullScren ? 'auto' : 'zoom-in' };
`;
const Name =styled.div`

`;
const Description =styled.div`
color: ${({isFullScren})=> isFullScren? 'white': 'black'}
`;
const ExitButton = styled.div `
position: absolute;
top: 30px;
right: 50px;
width: 32px;
height: 32px;
opacity: 0.3;
&:hover {
  opacity: 1;
}
&:after,&:before {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #fff;
}
&:after {
  transform: rotate(-45deg);
}
&:before {
  transform: rotate(45deg);
}
`
const NextArrow = styled.div `
right: ${({isFullScren})=> isFullScren? "15px": "-25px"};
&:before {
  color: ${({isFullScren})=> isFullScren? "#fff": "#000"};
  font-size: 30px;
}
`
const PrevArrow = styled.div `
left: ${({isFullScren})=> isFullScren? "15px": "-35px"};
&:before {
  color: ${({isFullScren})=> isFullScren? "#fff": "#000"};
  font-size: 30px;
}
`
function SampleNextArrow (props) {
  const { className, onClick, isFullScren } = props;
  return (
    <NextArrow className={className} onClick={onClick} isFullScren={isFullScren}></NextArrow>
  );
}

function SamplePrevArrow (props) {
  const { className, onClick, isFullScren } = props;
  return (
    <PrevArrow className={className} onClick={onClick} isFullScren={isFullScren}></PrevArrow>
  );
}
const mapStateToProps = (state) => {
  return {
    places: state.country.places
  }
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

