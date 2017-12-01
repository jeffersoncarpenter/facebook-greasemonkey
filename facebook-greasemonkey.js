// ==UserScript==
// @name        Facebook
// @namespace   facebook
// @include     /^https:\/\/www\.facebook\.com\/.*/
// @version     1
// @grant       none
// ==/UserScript==
// allow pasting


// hide ads on right side of screen
var hideHomeRightColumn = document.createElement("STYLE");
hideHomeRightColumn.innerHTML = '.home_right_column {display: none}';
document.head.appendChild(hideHomeRightColumn);


// hide megaphone
var hideHomeRightColumn = document.createElement("STYLE");
hideHomeRightColumn.innerHTML = '#pagelet_megaphone {display: none}';
document.head.appendChild(hideHomeRightColumn);


// do these things every 100 milliseconds, but only when facebook tab is open
var interval;
var setIntervals = function () {
  interval = setInterval(function () {
    var as = document.querySelectorAll('a');
    for (var i = 0; i < as.length; i++) {
      var a = as[i];

      // click "not now"
      if (a.innerHTML === 'Not Now') {
        a.click();
      }

      // hide all sponsored stories
      if (a.innerHTML === 'Sponsored') {
        var el = a;
        while (el && el.id.indexOf('hyperfeed_') === -1) {
          el = el.parentElement;
        }
        if (el) {
          el.style.display = 'none';
        }
      }

      // hide "back to top stories"
      if (a.innerHTML === 'Back to top stories') {
        var el = a.parentElement.parentElement;
        el.style.display = 'none';
      }
    };

    // hide hyperfeeds containing a span containing 'Facebook'
    var hyperfeeds = document.evaluate("//div[starts-with(@id, 'hyperfeed_')] // span[contains(text(), 'Facebook')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for (var i = 0; i < hyperfeeds.snapshotLength; i++) {
      var span = hyperfeeds.snapshotItem(i);
      var el = span;
      while (el && el.id.indexOf('hyperfeed_') === -1) {
        el = el.parentElement;
      }
      if (el) {
        el.style.display = 'none';
      }
    }

    // hide hyperfeeds containing a span containing 'Only you can see this'
    var hyperfeeds = document.evaluate("//div[starts-with(@id, 'hyperfeed_')] // span[contains(text(), 'Only you can see this')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for (var i = 0; i < hyperfeeds.snapshotLength; i++) {
      var span = hyperfeeds.snapshotItem(i);
      var el = span;
      while (el && el.id.indexOf('hyperfeed_') === -1) {
        el = el.parentElement;
      }
      if (el) {
        el.style.display = 'none';
      }
    }

    // hide hyperfeeds containing a span containing 'Only you can see this unless you share it'
    // Seen in "Your October Moments" story
    var hyperfeeds = document.evaluate("//div[starts-with(@id, 'hyperfeed_')] // span[contains(text(), 'Only you can see this unless you share it')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for (var i = 0; i < hyperfeeds.snapshotLength; i++) {
      var span = hyperfeeds.snapshotItem(i);
      var el = span;
      while (el && el.id.indexOf('hyperfeed_') === -1) {
        el = el.parentElement;
      }
      if (el) {
        el.style.display = 'none';
      }
    }


    // refresh in case of "posts you haven't seen"
    if (-1 !== document.body.innerHTML.indexOf('POSTS YOU HAVEN\'T SEEN')) {
        window.location.reload();
    }
  }, 100);
};
setIntervals();
window.addEventListener('blur', function () {
  clearInterval(interval);
});
window.addEventListener('focus', setIntervals);


// show "most recent" stories, not "top stories"
if (window.location.href === 'https://www.facebook.com/' ||
    window.location.href === 'https://www.facebook.com/?sk=h_nor' ||
    window.location.href === 'https://www.facebook.com/?ref=logo') {
  window.location.href = 'https://www.facebook.com/?sk=h_chr';
}
