var igdb = require('igdb-wrapper-node');

function igdb.games.search({}, function(err, response) {
  // response handler
  var obj = JSON.parse(response);
   $("#stuff").empty();
      for (var i = 0; i < obj.length; i++) {
          $("#stuff").append("<div class='search_item'><img src="+ obj[i].movie.images.poster.thumb+"><div class='item_title'>"+obj[i].game.name+"</div>

  request.send();
});

function search() {
	// These code snippets use an open-source library. http://unirest.io/java
	HttpResponse<String> response = Unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda")
	.header("X-Mashape-Key", "s4FxqgEKLmmshNOUp9m2EDHkTQqqp1uJjZIjsntn3FsNh5kPUP")
	.header("Accept", "application/json")
	.asString();

   var obj = JSON.parse(response);
   $("#stuff").empty();
      for (var i = 0; i < obj.length; i++) {
          $("#stuff").append("<div class='search_item'><img src="+ obj[i].movie.images.poster.thumb+"><div class='item_title'>"+obj[i].game.name+"</div>

  request.send();
}
