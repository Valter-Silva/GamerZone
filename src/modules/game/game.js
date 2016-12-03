require('./game.less');

var appFunc = require('../utils/appFunc'),
    template = require('./game.tpl.html');

var id;

var gameModule = {
    init: function(query){
        id = query.id;
        appFunc.hideToolbar();

        this.bindEvents();

        // render game card
        this.getGame();
;
    },
    getInfo: function(){
      var request = new XMLHttpRequest();
      request.open('GET',"https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=30&offset=0&order=release_dates.date%3Adesc&search=" + document.getElementById('search_query').value)
      request.setRequestHeader("X-Mashape-Key", "0wxwUEX8z1mshuxBz2pcjsv4gkgAp1XeC9UjsnmSotnOFZL8sK");
      request.setRequestHeader("Accept", "application/json");

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          var obj = JSON.parse(this.responseText);

          document.getElementById("stuff").innerHTML = "";
          for (var i = 0; i < obj.length; i++) {
            try {
                var x = obj[i].cover.cloudinary_id;
                // do something with x
                 $("#stuff").append("<div data-id="+ obj[i].id +" class='search_item'><img src=https://res.cloudinary.com/igdb/image/upload/t_cover_small_2x/"+ obj[i].cover.cloudinary_id+".jpg><div class='item_title'>"+obj[i].name+"</div></div>");
            } catch(e) {
                // do whatever you want when thing.foo.bar didn't work
            }
               
            }
        }   
      };
      request.send();
      return false;
    },
    getGame: function(){
        var $this = $$('#homeView .home-timeline .card[data-id="'+ id +'"]');

        var item = {
            id: $this.data('id'),
            nickname: $this.find('.ks-facebook-name').html(),
            avatar: $this.find('.ks-facebook-avatar').data('avatar-id'),
            time: appFunc.timeFormat($this.find('.ks-facebook-date').data('time')),
            text: $this.find('.card-content-inner>p').html()
        };

        if($this.find('.item-image>img')[0])
            item.image = $this.find('.item-image img').attr('src');

        var output = appFunc.renderTpl(template, item);

        $$('#itemContent').html(output);
    },
    bindEvents: function(){
        appFunc.bindEvents(bindings);
    }
};

module.exports = gameModule;