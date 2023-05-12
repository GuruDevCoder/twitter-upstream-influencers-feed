import React from 'react'
import PropTypes from 'prop-types'

import './User.css'

const User = ({user = {}}) => {
  return (
    <div className='User'>
      <div className='User-container'>
        <span className='User-content'>{user.name}</span>
        <img className='User-avatar' src={user.profile_image_url} />
      </div>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
