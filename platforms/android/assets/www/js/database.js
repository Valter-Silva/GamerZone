var db = window.openDatabase("Database", "1.0", "users", 200000000);

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
	db.transaction(createDB, errorDB, successDB);
}

function errorDB(err){
	alert("Error: "+err);
}

function createDB(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name VARCHAR(500), email UNIQUE VARCHAR(500))');
}