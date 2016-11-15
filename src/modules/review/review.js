require('./review.less');

var appFunc = require('../utils/appFunc'),
    commentModule = require('../comment/comment'),
    template = require('./review.tpl.html');

var id;

var reviewModule = {
    init: function(query){
        id = query.id;
        appFunc.hideToolbar();

        this.bindEvents();

        // render review card
        this.getReview();

        // init comment module
        commentModule.init();
    },
    getReview: function(){
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
        var bindings = [{
            element: '#commentContent',
            selector: '.comment-item',
            event: 'click',
            handler: commentModule.createActionSheet
        },{
            element: '#homeView .item-comment-btn',
            event: 'click',
            handler: commentModule.commentPopup
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = reviewModule;