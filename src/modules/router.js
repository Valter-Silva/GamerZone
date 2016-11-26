var index = require('./app/app'),
    appFunc = require('./utils/appFunc'),
    reviewModule = require('./review/review'),
    feedbackModule = require('./feedback/feedback'),
    aboutModule = require('./about/about'),
    languageModule = require('./language/language'),
<<<<<<< HEAD
    messageModule = require('./message/message');
    gameModule = require('./game/game');
=======
    messageModule = require('./message/message')
    loginModule = require('./login/login');
>>>>>>> origin/Santi

module.exports = {
    init: function() {
        var that = this;
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            that.pageBeforeInit(page);
        });

        $$(document).on('pageAfterAnimation', function (e) {
            var page = e.detail.page;
            that.pageAfterAnimation(page);
        });
    },
    pageAfterAnimation: function(page){
        var name = page.name;
        var from = page.from;

        if(name === 'homeView' || name === 'contactView' || name === 'setting' ){
            if(from === 'left'){
                appFunc.showToolbar();
            }
        }
    },
    pageBeforeInit: function(page) {
        var name = page.name;
        var query = page.query;

        switch (name) {
            case 'about':
                aboutModule.init();
                break;
            case 'feedback':
                feedbackModule.init();
                break;
            case 'item':
                reviewModule.init(query);
                break;
            case 'message':
                messageModule.init(query);
                break;
            case 'language':
                languageModule.init();
                break;
<<<<<<< HEAD
            case 'game':
                gameModule.init();
=======
            case 'login':
                loginModule.init();
>>>>>>> origin/Santi
                break;
        }
    }
};