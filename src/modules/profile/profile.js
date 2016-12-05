require('./profile.less');

var service = require('./service'),
    appFunc = require('../utils/appFunc'),
    template = require('./profile.tpl.html'),
    inputModule = require('../input/input');

var profile = {
    init: function(){
        this.getProfile();
        this.bindEvent();
    },
    getProfile: function(){
        var that = this;

        service.getProfile(function(tl){
            that.renderTimeline(tl);

            App.hideIndicator();

            //Unlock scroll loading status
            var ptrContent = $$('#profileView').find('.pull-to-refresh-content');
            ptrContent.data('scrollLoading','unloading');
        });
    },
    refreshTimeline: function(){

        service.refreshTimeline(function(tl){
            // Find newest msg id in ptrContent;

            home.refreshItemTime();

            var newestId = $$('#profileView').find('.home-timeline .card'). eq(0).data('id');

            setTimeout(function () {
                document.getElementById("stuff").innerHTML = "";
                $$('#profileView .refresh-click').find('i').removeClass('ios7-reloading');

                if(parseInt(newestId) === 48) {
                    home.showLoadResult(i18n.index.nothing_loaded);
                    App.pullToRefreshDone();
                    return false;
                }

                var length = tl.length;

                if(length >= 15){
                    home.renderTimeline(tl);
                }else if(length > 0){
                    home.renderTimeline(tl, 'prepend');
                }else{
                    home.showLoadResult(i18n.index.nothing_loaded);
                }

                App.pullToRefreshDone();

            },1500);

        });
    },
    infiniteTimeline: function(){
        var $this = $$(this);

        App.showIndicator();
        service.infiniteTimeline(function(tl){
            var status = $this.data('scrollLoading');
            if (status === 'loading') return;

            $this.data('scrollLoading','loading');

            var items = $this.find('.home-timeline .card');
            var length = items.length;
            var lastId = items.eq(length - 1).data('id');
            if(parseInt(lastId) === 24){
                App.detachInfiniteScroll($this);
                App.hideIndicator();
            }else{

                setTimeout(function(){
                    $this.data('scrollLoading','unloading');
                    home.renderTimeline(tl, 'append');

                    App.hideIndicator();
                },1500);
            }
        });
    },
    refreshTimelineByClick: function(){
        setTimeout(function(){
            $$('#profileView .refresh-click').find('i').addClass('ios7-reloading');
        },350);

        $$('#profileView .pull-to-refresh-content').scrollTop(0,300);

        App.pullToRefreshTrigger('#profileView .pull-to-refresh-content');
    },
    showLoadResult: function(text){
        setTimeout(function(){
            $$('#profileView .load-result').html(text).css('opacity','1').transition(1000);

            setTimeout(function(){
                $$('#profileView .load-result').css('opacity','0').transition(1000);
            },2100);
        },400);
    },
    refreshItemTime:function(){
        $$('#profileView').find('.card .ks-facebook-date').each(function(){
            var nowTime = appFunc.timeFormat($$(this).data('time'));
            $$(this).html(nowTime);
        });
    },
    photoBrowser: function(){

        var url = $$(this).attr('src');

        var myPhotoBrowser = App.photoBrowser({
            photos: [url],
            toolbar: false,
            backLinkText: i18n.global.close
        });

        myPhotoBrowser.open();

    },
    renderTimeline: function(tl, type){
        var renderData = {
            timeline: tl,
            finalText: function(){
                return appFunc.matchUrl(this.text);
            },
            time: function(){
                return appFunc.timeFormat(this.created_at);
            }
        };
        var output = appFunc.renderTpl(template, renderData);
        if(type === 'prepend'){
            $$('#profileView').find('.home-timeline').prepend(output);
        }else if(type === 'append') {
            $$('#profileView').find('.home-timeline').append(output);
        }else {
            $$('#profileView').find('.home-timeline').html(output);
        }
    },
    openItemPage: function(e){
        if(e.target.nodeName === 'A' || e.target.nodeName === 'IMG'){
            return false;
        }
        var itemId = $$(this).data('id');
        var gameObj = $$(this).game;
        homeF7View.router.loadPage('page/review.html?id=' + itemId + '?game=' + gameObj);
    },
    openGamePage: function(e){
        if(e.target.nodeName === 'A' || e.target.nodeName === 'IMG'){
            return false;
        }
        var itemId = $$(this).data('id');
        homeF7View.router.loadPage('page/game.html?id=' + itemId);
    },
    bindEvent: function(){

        var bindings = [{
            element: '#profileView',
            selector: '.pull-to-refresh-content',
            event: 'refresh',
            handler: this.refreshTimeline
        },{
            element: '#profileView',
            selector: '.pull-to-refresh-content',
            event: 'infinite',
            handler: this.infiniteTimeline
        },{
            element: '#profileView',
            selector: '.refresh-click',
            event: 'click',
            handler: this.refreshTimelineByClick
        },{
            element: '#profileView',
            selector: 'a.open-send-popup',
            event: 'click',
            handler: inputModule.openSendPopup
        },{
            element: '#profileView',
            selector: '.home-timeline .ks-facebook-card',
            event: 'click',
            handler: this.openItemPage
        },{
            element: '#profileView',
            selector:'div.card-content .item-image>img',
            event: 'click',
            handler: this.photoBrowser
        },{
            element: '#profileView',
            selector:'div.search_item',
            event: 'click',
            handler: this.openGamePage
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = profile;