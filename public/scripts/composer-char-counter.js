
$(document).ready(function() {

  $('#tweet-text').keyup(function() {
    const inputChars = $(this).val().length;
    const counter = $(this).closest('form').find('.counter');
    const value = 140 - inputChars;
    counter.val(value);

    if (value < 0) {
      $(counter)[0].style.color = 'red';
    } else {
      $(counter)[0].style.color = 'inherit';
    }
  });
});