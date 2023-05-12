import Twitter from 'twitter'
import oauth from 'oauth'
import TweetModel from '../models/Tweet'

const twitterConsumerKey = 'Ia56xPDEu2ZrdnTjilIJGPnSA'
const twitterConsumerSecret = 'JYawk6EXfGDHrXZ6SjT5B9zQ7N1eZEyMQv3x4t5x4JVlEciHLv'

const streamDataHandler = (stream, io) => {
  stream.on('data', (data) => {
    if (data['user'] !== undefined) {
      const tweet = {
        twid: data['id_str'],
        active: false,
        author: data['user']['name'],
        avatar: data['user']['profile_image_url'],
        body: data['text'],
        date: data['created_at'],
        screenname: data['user']['screen_name']
      }

      const tweetEntry = new TweetModel(tweet)

      tweetEntry.save((err) => {
        if (!err) {
          io.emit('tweet', tweet)
        }
      })
    }
  })
}

const oAuth = () => {
  return new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    twitterConsumerKey,
    twitterConsumerSecret,
    '1.0A',
    'http://127.0.0.1:8080/sessions/callback',
    'HMAC-SHA1')
}

const twitterInstance = (oauthAccessToken, oauthAccessTokenSecret) => {
  return new Twitter({
    consumer_key: twitterConsumerKey,
    consumer_secret: twitterConsumerSecret,
    access_token_key: oauthAccessToken,
    access_token_secret: oauthAccessTokenSecret
  })
}

export { streamDataHandler, oAuth, twitterInstance }
