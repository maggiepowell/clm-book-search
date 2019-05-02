

var queryURL
var goodReadsResponse

function generateQueryURL(){
  // save .val of search box as query variable
  var titleQuery = $("#title").val();
  queryURL =  "https://www.googleapis.com/books/v1/volumes?q=" + titleQuery + "&callback=handleResponse"
  console.log(queryURL);
}

//bind dynamically generated items

function handleResponse(response){
  //save response 
  booksResponse = response
  console.log(response)
  $("#searchResults").html("");
  $(".results").html("");
  $(".results").append("<div class='row'><h6>Results</h6></div>");
  for (var i = 0; i < 3; i++) {
    var item = booksResponse.items[i];
    // show title, author, and image in UI 
    $("#searchResults").append("<div class='col s4'> <div class='card horizontal bookSearchCard'>  <div class='card-image book-image'> <img src="+item.volumeInfo.imageLinks.smallThumbnail+"/></div> <div class='card-stacked'> <div class='card-content'><p class='title'>"+ item.volumeInfo.title + "</p> <p>" + item.volumeInfo.authors[0]+"</p>");  
  }
  bindcards();
}

function bindcards(){
  $('.bookSearchCard').off();
  
  //click handler to load youtube videos 
  $( ".bookSearchCard" ).click(function() {
    console.log('search result chosen handler');
    generateYoutubeURL(this);
    
});
}


$( "#submit" ).click(function(event) {
  event.preventDefault();
  //if search is empty, show error message
  var searchquery = $("#title").val()
  if ( searchquery === "" ) {
    $(".input-field").append('<span class="helper-text helpertext"> Oops! Please search for a book </span>');
  }
  else {
    console.log("search clickhandler");
    $("#player").html("");
    $(".videoresults").html("");
    generateQueryURL();
    $.ajax({
      //use saved queryurl 
      url: queryURL,
      method: "GET",
      dataType: "jsonp",
    }).then(handleResponse);
  }
});


function clearSearch(){
  console.log('clearhandler')
  $("#title").val("");
}

//get youtube video id relative to book being searched
var youtubeQueryURL 
var youtubeResponse
//var youtubeVideoIDs = [];
function generateYoutubeURL(el){
  console.log(el);
  var titleQuery = $("p", el).first().text();
  console.log(titleQuery);
  youtubeQueryURL =  "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBezsbgbsQEgpKlzTboqd7ynYrVSJvKDZg&part=id&maxResults=3&q=" + titleQuery;
  $.ajax({
    url: youtubeQueryURL,
    method: "GET"
  })
  .then(function(response) {
    youtubeResponse = response
    showVideoResults();
    console.log('response:', response);
    console.log('response.items[0].id.videoId:', response.items[0].id.videoId);
    console.log('YouTube Object YoutubeResponse.items[0].id.videoID: ' + youtubeResponse.items[0].id.videoID)
    //youtubeVideoIDs.push(response.items[0].id.videoId);
    //youtubeVideoIDs.push(response.items[1].id.videoId);
    //youtubeVideoIDs.push(response.items[2].id.videoId);
  })
};

function showVideoResults(){
  $(".videoresults").html("");
  $("#player").html("");

    $(".videoresults").append("<div class='row'><h6>Related Videos:</h6></div>");

    for (let i = 0; i < 3; i++) {
      var videoID = youtubeResponse.items[i]
      var player = $('<div class="col s4"><div class="card"><div class="card-image video"><iframe id="ytplayer" type="text/html" width="200" height="" src="https://www.youtube.com/embed/' + videoID.id.videoId +'?autoplay=0&origin=http://example.com"frameborder="0"></iframe></div></div></div>');
      $('#player').append(player);
    }
}


  

