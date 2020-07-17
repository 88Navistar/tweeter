
$(document).ready(function() {

  //Helper functions ------>>>
  //Escape xss attack
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //renderTweets loops through tweets, calls createTweetElement for each tweet and prepends to tweet container
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  //loadTweets call the renderTweets and loads to /tweets through the DOM
  const loadTweets = () => {
    $.ajax({ url: "/tweets",  method: "GET" })
      .then(function(tweets) {
        $('#tweets-container').empty();
        renderTweets(tweets);
      });
  };
  loadTweets();

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
      <span>${moment(user.created_at).fromNow()}</span>
      <div>
        <i class="fa fa-flag" aria-hidden="false"></i>
        <i class="fa fa-retweet" aria-hidden="false"></i>
        <i class="fa fa-heart" aria-hidden="false"></i>
      </div>
    </footer>
    </article>`;

    return $tweet;
  };

  //Listeners
  //Submit Tweet
  $("#form-tweets").on("submit", function(event) {
    event.preventDefault();
  
    const data = $(this).serialize();
    //const input = data.replace(/%20/g, "").split("=")[1];

    if ($("#tweet-text").val().length > 140 || !$("#tweet-text").val()) {
      $(".errMsg").slideDown(400);
      $(".errMsg p").text('Please tweet between 1 & 140 characters');
    } else {
      $.ajax("/tweets", {method: 'POST', data: data}).then(function() {
        $(".errMsg").slideUp(100);
        loadTweets();
        $("#tweet-text").val("");
        $("#tweet-text").focus();
        $('.counter').val(140);
      });
    }
  });

  //Form Toggle...go to tweet field on click (Stretch One)
  $("#top-icon").on("click", function() {
    $("#top-icon").slideDown(600);
    $("#tweet-text").focus();
  });

}); //Document.ready closing brace
