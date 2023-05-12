import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schema = new Schema({
  twid: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  screenname: String
})

class TweetClass {
  static getTweets (page, skip, callback) {
    let tweets = []
    const start = (page * 10) + (skip * 1)

    this.find({}, 'twid active author avatar body date screenname', {
      skip: start,
      limit: 15
    })
      .sort({date: 'desc'})
      .exec((err, docs) => {

        if (!err) {
          tweets = docs
          tweets.forEach((tweet) => {
            tweet.active = true
          })
        }

        callback(tweets)
      })
  }
}

schema.loadClass(TweetClass)

export default mongoose.model('Tweet', schema)
