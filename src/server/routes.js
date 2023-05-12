import inspect from 'util-inspect'
import { oAuth } from './utils'
import getTweets from './utils/tweets'
import Tweet from './models/Tweet'

const oa = oAuth()

export default {

  connect: (req, res) => {
    oa.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
      if (error) {
        res.send('Error getting OAuth request token : ' + inspect(error), 500)
      } else {
        req.session.oauthRequestToken = oauthToken
        req.session.oauthRequestTokenSecret = oauthTokenSecret
        res.redirect('https://twitter.com/oauth/authorize?oauth_token=' + req.session.oauthRequestToken)
      }
    })
  },

  callback: (req, res) => {
    const onAccess = (error, oauthAccessToken, oauthAccessTokenSecret) => {
      if (error) {
        res.send('Error getting OAuth access token : ' + inspect(error), 500)
      } else {
        req.session.oauthAccessToken = oauthAccessToken
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
        getTweets(oauthAccessToken, oauthAccessTokenSecret)
        res.redirect('/')
      }
    }

    oa.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, onAccess)
  },

  page: (req, res) => {
    Tweet.getTweets(req.params.page, req.params.skip, tweets => res.send(tweets))
  },

  authorized: (req, res) => {
    const url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    const {oauthAccessToken, oauthAccessTokenSecret} = req.session
    oa.get(url, oauthAccessToken, oauthAccessTokenSecret, (error) => res.send(!error))
  },

  credentials: (req, res) => {
    const url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    const {oauthAccessToken, oauthAccessTokenSecret} = req.session
    oa.get(url, oauthAccessToken, oauthAccessTokenSecret, (error, response) => res.send(!error ? response: false))
  }
}
