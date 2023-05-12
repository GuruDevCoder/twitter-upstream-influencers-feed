import React from 'react'
import './NotificationBar.css'

const NotificationBar = ({count, onShowNewTweets}) => (
  <div className={'NotificationBar' + (count > 0 ? ' active' : '')}>
    <div className='NotificationBar-content'>
      <a href='#top' onClick={onShowNewTweets}>View {count} new tweets!</a>
    </div>
  </div>
)

export default NotificationBar
