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
   
    showLoadResult: function(text){
        setTimeout(function(){
            $$('#profileView .load-result').html(text).css('opacity','1').transition(1000);

            setTimeout(function(){
                $$('#profileView .load-result').css('opacity','0').transition(1000);
            },2100);
        },400);
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
    bindEvent: function(){

        var bindings = [{
            element: '#profileView',
            selector:'div.card-content .item-image>img',
            event: 'click',
            handler: this.photoBrowser
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = profile;