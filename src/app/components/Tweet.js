import React from 'react'
import timeago from 'timeago.js'
import './Tweet.css'

const Tweet = ({tweet}) => {
  const {screenname, twid, author, avatar, date, body, active} = tweet
  const tweetUrl = `http://www.twitter.com/${screenname}/status/${twid}`

  return (
    <div className={'Tweet' + (active ? ' active' : '')}>
      <div className="Tweet-content">
        <div>
          <a className="Tweet-accountGroup" href={`http://www.twitter.com/${screenname}`}>
            <img className="Tweet-avatar" src={avatar} alt={screenname}/>
            <span className="u-textTruncate">
              <strong className="Tweet-fullname">{author}</strong>
              <span>&rlm;</span>
              <span>&nbsp;</span>
            </span>
            <span className="Tweet-username">@{screenname}</span>
          </a>

          <span className="Tweet-time">
            <a href={tweetUrl} title="17:59 - 4 nov 2017">
              <span>{timeago().format(date)}</span>
            </a>
          </span>
        </div>

        <div>
          <p className="TweetTextSize" lang="en">
            <a className="Tweet-body" href={tweetUrl}>{body}</a>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Tweet
