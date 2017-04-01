// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
    $.get('/analyze', function(pAnalysis) {
    $( "ul#analysis" ).empty();
    pAnalysis.forEach(function(pAnalysis) {
      $('<li></li>').text(" 🤖 " + pAnalysis["model"] + ": " + pAnalysis["score"].toString() + " 🗯 " + pAnalysis["text"]).prependTo('ul#analysis');
    });
  });
});

function logPerspective(id,comment,model) {
  $.post('/analyze?' + $.param({id: id, comment: comment, model: model}), function() {
    $.get('/analyze', function(pAnalysis) {
      $( "section#current" ).empty();
      var currentAnalysis = pAnalysis[pAnalysis.length - 1]
      $('<p></p>').text(" 🤖 " + currentAnalysis["model"] + ": " + currentAnalysis["score"].toString() + " 🗯 " + currentAnalysis["text"]).prependTo('section#current');
      $( "ul#analysis" ).empty();
      pAnalysis.forEach(function(pAnalysis) {
        $('<li></li>').text(" 🤖 " + pAnalysis["model"] + ": " + pAnalysis["score"].toString() + " 🗯 " + pAnalysis["text"]).prependTo('ul#analysis');
      });
    });
  });
}


