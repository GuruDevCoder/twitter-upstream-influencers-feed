import { io } from '../index'
import { streamDataHandler, twitterInstance } from './'

const getTweets = (oauthAccessToken, oauthAccessTokenSecret) => {
  const twit = twitterInstance(oauthAccessToken, oauthAccessTokenSecret)

  twit.get('friends/ids', (error, result) => {
    if (error) throw error

    // Todo: manage here large result sets
    // https://developer.twitter.com/en/docs/basics/cursoring
    // In this example we are going to be naive

    const userIds = result.ids

    twit.stream('statuses/filter', {follow: userIds.join(',')}, stream => streamDataHandler(stream, io))
  })
}

export default getTweets
