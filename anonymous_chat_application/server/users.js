const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("database.db");

db.run(`CREATE TABLE IF NOT EXISTS database (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_text TEXT
)`);

const addMessage = async ({ message_text }) => {
	return new Promise((resolve, reject) => {
		const query = `INSERT INTO database (message_text) VALUES (?)`;
		db.run(query, [message_text], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(this.lastID);
			}
		});
	});
};

const editMessage = async ({ message_id, editedMessageText }) => {
	return new Promise((resolve, reject) => {
		const query = `UPDATE database SET message_text = ? WHERE message_id = ?`;
		db.run(query, [editedMessageText, message_id], function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(this.changes);
			}
		});
	});
};

module.exports = { addMessage, editMessage };