require('./login.less');

var appFunc = require('../utils/appFunc'),
    homeView = require('../home/home');

var page;

var login = {
    init: function(){
        login.bindEvents(); 
    },
    checkLogin: function() {
		var username = $$('#username').val();
	    var password = $$('#password').val();
	    // Handle username and password
	    //hiApp.alert('Username: ' + username + ', Password: ' + password);
	    if(appFunc.checkEquals(username, "S") && appFunc.checkEquals(password, "123")){
	    	hiApp.closeModal('#loginView');
	    } 
	},
    bindEvents: function(){
        var bindings = [{
            element: '#loginView',
            selector: '.list-button',
            event: 'click',
            handler: login.checkLogin
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = login;