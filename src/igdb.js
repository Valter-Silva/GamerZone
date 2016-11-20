var unirest = require('unirest');

function search() {
    // These code snippets use an open-source library. http://unirest.io/java
   var response = unirest.get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda")
.header("X-Mashape-Key", "0wxwUEX8z1mshuxBz2pcjsv4gkgAp1XeC9UjsnmSotnOFZL8sK")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
   
   var obj = JSON.parse(response);
   $("#stuff").empty();
      for (var i = 0; i < obj.length; i++) {
          $("#stuff").append("<div class='search_item'><div class='item_title'>"+obj[i].game.name+"</div>");
            }

  request.send();
}
