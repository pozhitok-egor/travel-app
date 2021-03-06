import React from 'react'

export const Country = (props) => {
  console.log(props);
  return (
    <div>
      Country page for {props.match.params.id}
    </div>
  )
}