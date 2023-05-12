import React from 'react'
import PropTypes from 'prop-types'
import Tweet from './Tweet'
import './Tweets.css'

const Tweets = ({tweets = []}) => {
  return (
    <div className='Tweets'>
      {tweets.map((tweet) => (<Tweet key={tweet._id} tweet={tweet} />))}
    </div>
  )
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
}

export default Tweets
