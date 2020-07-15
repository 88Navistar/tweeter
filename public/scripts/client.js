/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  console.log('fire this')

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$('#tweets-container').empty();

for (const tweet of tweets) {
  console.log("renderTweets -> tweets", tweets)
  const $tweet = createTweetElement(tweet);

  $('#tweets-container').prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  let $tweet = `<article class="tweet">
    <header>
      <div>
        <img src="${user.avatars}" alt="Users Avatar">
        <p>${user.name}</p>
      </div>
      <div class="handle">${user.handle}</div>
    </header>
    <div><p>${content}</p></div>
    <hr>
    <footer>
      <p>${created_at}</p>
      <div>
        <i class="fa fa-flag" aria-hidden="false"></i>
        <i class="fa fa-retweet" aria-hidden="false"></i>
        <i class="fa fa-heart" aria-hidden="false"></i>
      </div>
    </footer>
    </article>`

return $tweet;
}


renderTweets(data);
});