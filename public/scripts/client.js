/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function() {

//Helper functions ------>>>
//Escape xss attack
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//renderTweets loops through tweets, calls createTweetElement for each tweet and prepends to tweet container
const renderTweets = function(tweets) {

for (const tweet of tweets) {
  const $tweet = createTweetElement(tweet);
  $('#tweets-container').prepend($tweet);
  }
}

//loadTweets call the renderTweets and loads to /tweets through the DOM
const loadTweets = () => {
  $.ajax({ url: "/tweets",  method: "GET" })
    .then(function(tweets) {
      $('#tweets-container').empty();
      renderTweets(tweets);
    });
};
loadTweets ();

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  const xssSafe = escape(content.text);
  let $tweet = `<article class="tweet">
    <header>
      <div>
        <img src="${user.avatars}" alt="Users Avatar">
        <p>${user.name}</p>
      </div>
      <div class="handle">${user.handle}</div>
    </header>
    <div><p>${xssSafe}</p></div>
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


//renderTweets(data);


//Listeners
$("#form-tweets").on( "submit", function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  //const input = data.replace(/%20/g, "").split("=")[1];

    if ($("#tweet-text").val().length > 140 || !$("#tweet-text").val()) {
      $("#form-tweets").append($(`<div id="errMsg"> <p> Please tweet between 1 and 140 characters </> </div>`));
    } else {
  $.ajax("/tweets", {method: 'POST', data: data}).then(function () {
    loadTweets();
    $("#tweet-text").val("")
    $("#tweet-text").focus();

      });
    }
  });
  
}); //Document.ready closing brace
