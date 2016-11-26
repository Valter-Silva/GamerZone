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