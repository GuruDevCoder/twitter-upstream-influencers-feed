import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import NotificationBar from './components/NotificationBar'
import Tweets from './components/Tweets'
import Signin from './components/Signin'
import User from './components/User'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      authorized: props.authorized || false,
      tweets: props.tweets || [],
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false,
      user: props.user || {}
    }
  }

  componentDidMount () {

    axios.get('/credentials')
      .then(response => {
        if (response.data) {
          window.addEventListener('scroll', this.checkWindowScroll.bind(this))
          io().connect().on('tweet', data => this.addTweet(data))
          this.setState({authorized: true, user: response.data})
          this.getPage(this.state.page)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  showNewTweets () {
    const updated = this.state.tweets.map((tweet) => {
      tweet.active = true
      return tweet
    })

    this.setState({tweets: updated, count: 0})
  }

  getNextPage () {
    const newPage = this.state.page + 1
    this.setState({paging: true, page: newPage})
    this.getPage(newPage)
  }

  getPage (page) {
    axios.get(`/page/${page}/${this.state.skip}`)
      .then((response) => {
        if (response.data.length > 0) {
          this.loadPagedTweets(response.data)
        } else {
          this.setState({paging: false, done: true})
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loadPagedTweets (tweets) {
    if (tweets.length > 0) {
      const updated = [...this.state.tweets, ...tweets]
      this.setState({tweets: updated, paging: false})
    } else {
      this.setState({done: true, paging: false})
    }
  }

  checkWindowScroll () {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const s = (document.body.scrollTop || document.documentElement.scrollTop || 0)

    const scrolled = (h + s) >= document.body.offsetHeight

    // If the user scrolled enough
    if (scrolled && !this.state.paging && !this.state.done) {
      this.getNextPage()
    }
  }

  addTweet (tweet) {
    const {tweets, count, skip} = this.state
    tweets.unshift(tweet)
    this.setState({tweets, count: count + 1, skip: skip + 1})
  }

  render () {
    const app = (
      <div id='app'>
        <User user={this.state.user}/>
        <Tweets tweets={this.state.tweets}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets.bind(this)}/>
      </div>
    )

    const authorize = (
      <Signin href='/sessions/connect'/>
    )

    return this.state.authorized ? app : authorize
  }
}

// App.defaultProps = {
//   authorized: true,
//   tweets: [
//     {
//       active: true,
//       author: 'Huy Giang',
//       avatar: 'http://pbs.twimg.com/profile_images/803958521104474112/VooWa2Zk_normal.jpg',
//       body: 'RT @Real_CSS_Tricks: How to structure your CSS better as components :: https://t.co/WQfmaiEhyh',
//       date: '2017-11-05T18:14:56.000Z',
//       screenname: '_huygn',
//       twid: '927237814558736385',
//       _id: '59ff5521af1ceed190bd0126'
//     },
//     {
//       active: true,
//       author: 'Anand Graves',
//       avatar: 'http://pbs.twimg.com/profile_images/62545182/anandgraves_normal.png',
//       body: 'RT @wesbos: Since :before and :after are first class CSS Grid items, this “lines on either side” design can easily be accompl… ',
//       date: '2017-11-05T18:14:37.000Z',
//       screenname: 'anandgraves',
//       twid: '927237735164899328',
//       _id: '59ff550eaf1ceed190bd0125'
//     },
//
//     {
//       active: true,
//       author: 'Konrad Eriksson',
//       avatar: 'http://pbs.twimg.com/profile_images/3709979059/a8f4853b80a1cc5b11f45c2df8142c7c_normal.png',
//       body: 'RT @iamdevloper: 1969:↵-what\'re you doing with that 2KB of RAM?↵-sending people to the moon↵↵2017:↵-what\'re you doing with that 1.5GB of RA…',
//       date: '2017-11-05T18:14:34.000Z',
//       screenname: 'konrader',
//       twid: '927237722393194498',
//       _id: '59ff550baf1ceed190bd0124'
//     }
//
//   ],
//   user: {
//     name: 'Albino Tonnina'
//   }
//   ,
// }

export default App
