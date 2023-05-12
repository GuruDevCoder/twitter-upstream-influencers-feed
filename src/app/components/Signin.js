import React from 'react'
import SigninImage from './assets/sign-in-with-twitter-button.png'
import './Signin.css'

const Tweet = ({href}) => {

  return (
    <div className='Signin'>
      <a href={href}>
        <img src={SigninImage} alt="Sign In with Twitter"/>
      </a>
    </div>
  )
}

export default Tweet
