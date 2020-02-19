import React from 'react'

export default function Loading (props) {
  return (
    <React.Fragment>
      {props.show && (
        <img
          className='spinner'
          src='images/status.png'
          alt='Loading Indicator'
        />
      )}
    </React.Fragment>
  )
}
