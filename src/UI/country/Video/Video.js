import React from 'react'
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Video = (props) => {
  return (
    <VideoWrapper>
      <ReactPlayer
        controls={true}
        url={props.videoUrl}
        width='100%'
        height='100%'
      />
    </VideoWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    videoUrl: state.country.videoUrl
  }
}

export default connect(mapStateToProps, null)(Video);


const VideoWrapper = styled.div`
  width: 100%;
  height: 400px;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 25px;
`