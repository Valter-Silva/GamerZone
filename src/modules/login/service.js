var xhr = require('../utils/xhr');

module.exports = {
    loadUserDatabase: function(callback) {
        xhr.simpleCall({
            func: 'users_db'
        }, function (res) {
            callback(res.data);
        });
    }
};