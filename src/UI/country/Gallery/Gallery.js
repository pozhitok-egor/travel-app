import React, {useState} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { PageLoader } from '../../PageLoader/PageLoader';
import { Link } from 'react-router-dom';
import { updateRating } from '../../../store/actions';
import starW from '../../../assets/icons/star_fill.svg'
import starD from '../../../assets/icons/star_white.svg'
import list from '../../../assets/icons/list.svg'

const settingsInit = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
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

const Gallery = ({places, lang,...props}) => { 
  const [settings,setSettings] = useState(settingsInit);
  const handle = useFullScreenHandle();
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(()=> {
    if(places === 1) setSettings(prev=>{return {...prev, slidesToShow:1,  nextArrow: <SampleNextArrow isFullScren={true}/>, prevArrow: <SamplePrevArrow isFullScren={true}/>}})
    if(places.length) {
    places.forEach((el, index) => {
      const src = el.imageUrl 
      const primaryImage = new Image() 
      primaryImage.onload = () => { 
        setPageLoader(false)
      }
      primaryImage.src = src 
    }) }
  },[places])
  
  const handleClickImg = ()=> {
    if(!handle.active) handle.enter(); 
    else return 0
  }

  const handleChangeFullScrenn =(state)=> {
    if(window.innerWidth> 700 && places.length>1) {
      if(state) setSettings(prev=>{return {...prev, slidesToShow:1,  nextArrow: <SampleNextArrow isFullScren={true}/>, prevArrow: <SamplePrevArrow isFullScren={true}/>}})
      else setSettings(prev=>{return {...prev, slidesToShow:2,  nextArrow: <SampleNextArrow isFullScren={false}/>, prevArrow: <SamplePrevArrow isFullScren={false}/> }})
    }
  }  

  const handleChangeRating = (id,rating) => {    
    props.updateRating(id,rating)
  }
  return (
    <GalleryBlock>
      { pageLoader && places.length ? 
              <PageLoader /> :
      <FullScreen handle={handle} onChange={handleChangeFullScrenn}>
        <Slider {...settings}>
        {places.map((el,i) => {
          return <GalleryItem key={i} isFullScren={handle.active}>
            <GalleryItemImg src={el.imageUrl} alt={el.name[lang]} onClick={handleClickImg} isFullScren={handle.active}></GalleryItemImg>
            <Name>{el.name[lang]}</Name>
            {handle.active ?<Description isFullScren={handle.active}>{el.description[lang]}</Description>: null}
            <RatingBlock> 
            <Rating value={el.rating} handleChange={handleChangeRating} id={el._id} />
            <RatingTotal isFullScren={handle.active}>{Number(el.rating).toFixed(2)}</RatingTotal>
            <Link to= {`/rating/${el.countryId}/${el._id}`}>
              <ListImg src={list} alt="rating"></ListImg>
            </Link>
            </RatingBlock>
            
          </GalleryItem>
        })}
        </Slider>
        {handle.active ? <ExitButton onClick={handle.exit}></ExitButton> : null}
      </FullScreen>
      }
    </GalleryBlock>    
  )
}

const Rating = ({id, handleChange, value})=> {
  const mass= [1,2,3,4,5];
  const [valueHover, setValueHover]= useState(null);
  const [checked, setChecked]= useState(false)
  return (
    <RatingBlock onMouseOut={()=>{return !checked ? setValueHover(0): null}} >
      {mass.map((el,i)=>{
        return <RatingImg key={i} src={(valueHover || value)>=el ? starW: starD} alt='star' 
        onMouseOver={()=>{return !checked ? setValueHover(el): null}}
        onClick={()=>{handleChange(id,el); setChecked(true); setValueHover(el)}}>
        </RatingImg>
      }) }
    </RatingBlock>
  )
}
const GalleryBlock =styled.div`
margin: 15px 0 30px;
`;
const GalleryItem =styled.div`
height: ${({isFullScren}) => isFullScren ? '70vh' : '200px' };
outline: none;
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
width: 70%;
margin: 0 auto 20px;
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
right: ${({isFullScren})=> isFullScren? "15px": "-10px"};
&:before {
  color: ${({isFullScren})=> isFullScren? "#fff": "#000"};
  font-size: 30px;
}
`
const PrevArrow = styled.div `
left: ${({isFullScren})=> isFullScren? "15px": "-25px"};
&:before {
  color: ${({isFullScren})=> isFullScren? "#fff": "#000"};
  font-size: 30px;
}
`
const RatingBlock =styled.div`
display: flex;
justify-content: center;
`
const RatingTotal =styled.div`
width: 50px;
font-family: "Balsamiq Sans", sans-serif;
color: ${({isFullScren})=> isFullScren? "#fff": "#000"};
align-self: center;
line-height: 20px;
`
const RatingImg =styled.img`
width: 25px;
cursor: pointer
`
const ListImg =styled.img`
width: 25px;
cursor: pointer

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
    places: state.places,
    lang: state.language
  }
}

const mapDispatchToProps = {
  updateRating
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

