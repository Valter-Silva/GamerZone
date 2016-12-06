require('./setting.less');

var appFunc = require('../utils/appFunc'),
    template = require('./setting.tpl.html');

var settingView = {
    init: function(){
        settingView.bindEvents();
    },
    renderSetting: function(){
        if($$('#settingView .page-content')[0]) return;

        App.showIndicator();

        var renderData = {
            avatarUrl: 'http://lorempixel.com/68/68/people/7/',
            nickName: 'GamerZone',
            location: 'Budapest, Hungary'
        };

        var output = appFunc.renderTpl(template, renderData);
        $$('#settingView .page[data-page="setting"]').html(output);

        App.hideIndicator();
    },
    logOut: function(){
        App.confirm(i18n.setting.confirm_logout,function(){
            //mainView.router.loadPage('page/login.html');
            //App.showTab('#ourView');
        });
        App.confirm(i18n.setting.confirm_logout,function(){
            App.loginScreen();
        });
    },
    bindEvents: function(){
        var bindings = [{
            element: '#settingView',
            event: 'show',
            handler: settingView.renderSetting
        },{
            element: '#settingView',
            selector: '.logout-button',
            event: 'click',
            handler: settingView.logOut
        },{
            element: '#settingView',
            selector: '.update-button',
            event: 'click',
            //handler: settingView.checkVersion
        }];
        appFunc.bindEvents(bindings);
    }
};

module.exports = settingView;