require('./login.less');

var appFunc = require('../utils/appFunc'),
    service = require('./service'),
    homeView = require('../home/home');

var login = {
    init: function(){
        login.bindEvents(); 
    },
    loadUserDataToCheckLogin: function(){
        service.loadUserDatabase(function(c){
            setTimeout(function(){
                var usersData = {
                    users_db: c
                };
        		//console.log(usersData.users_db);
        		login.checkLogin(usersData.users_db);
            },500);
        });
    },
    loadUserDataToCheckSignIn: function(){
        service.loadUserDatabase(function(c){
            setTimeout(function(){
                var usersData = {
                    users_db: c
                };
        		//console.log(usersData.users_db);
        		login.registerUser(usersData.users_db);
            },500);
        });
    },
    checkLogin: function(usersData) {
		var username = $$('#username').val();
	    var password = $$('#password').val();
	    // Handle username and password
	    //App.alert('Username: ' + username + ', Password: ' + password);
	    if(appFunc.checkEquals(username, "S") && appFunc.checkEquals(password, "123")){
	    	App.closeModal('#loginView');
	    } 
	    //hiApp.alert('Username: ' + username + ', Password: ' + password);

	    var ok=false;
	    if(appFunc.checkEquals(username, localStorage.getItem("cacheUsername")) && appFunc.checkEquals(password, localStorage.getItem("cachePassword"))){
	    	ok=true;
	    	$$('#password').val("");
	    	hiApp.closeModal('#loginView');
	    }else{
			for (i = 0; i < usersData.length; i++) {
			    if(appFunc.checkEquals(usersData[i].username, username) && appFunc.checkEquals(usersData[i].password, password)){
			    	ok=true;
	    			$$('#password').val("");
			    	hiApp.closeModal('#loginView');
			    	break;
			    }
			}	    	
	    }
	    if(!ok){
	    	hiApp.alert("Incorrect password or username.");
	    }
	},
    registerUser: function(usersData) {
	    // Handle username and password
	    //hiApp.alert('Username: ' + username + ', Password: ' + password);

	    hiApp.prompt('Please, enter your email:', function (email) {
	    	var ok=!appFunc.checkEquals(localStorage.getItem("cacheEmail"), email);

	    	if(ok){
		    	for (i = 0; i < usersData.length; i++) {
				    if(appFunc.checkEquals(usersData[i].email, email)){
				    	ok=false;
	    				hiApp.alert('There is an account related to that email!');
				    	break;
				    }
				}
				if(ok){
			    	if(email==""|| !appFunc.isEmail(email)){
		    			hiApp.alert('Not a valid email!');
		    		}else{
			    		hiApp.modalLogin('Enter your username and password', function (username, password) {
			    			var ok=true;
			    			if(username==""||password==""){
			        			hiApp.alert('Username or password invalid!');
			        			ok=false;
			    			}if(ok){
				        		hiApp.alert('Thank you, ' + username + '!');
								localStorage.setItem("cacheUsername", username);
			    				$$('#username').val(username);
								localStorage.setItem("cachePassword", password);
			    				$$('#password').val(password);
								localStorage.setItem("cacheEmail", email);
			    			}
			        	});
			        }
				}
	    	}else{
	    		hiApp.alert('There is an account related to that email!');
	    	}
	    });
	},
    bindEvents: function(){
        var bindings = [{
            element: '#loginView',
            selector: '.login-button',
            event: 'click',
            handler: login.loadUserDataToCheckLogin
        },{
            element: '#loginView',
            selector: '.sign-in-button',
            event: 'click',
            handler: login.loadUserDataToCheckSignIn
        }];

        appFunc.bindEvents(bindings);
    }
};

module.exports = login;