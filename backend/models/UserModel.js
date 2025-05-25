// backend/models/UserModel.js

class UserModel {
  constructor(db) {
    this.db = db;
  }

  findByUsernameOrEmail(username, email, callback) {
    const query = "SELECT * FROM user WHERE username = ? OR email = ?";
    this.db.get(query, [username, email], callback);
  }

  insertUser({ username, email, password, phone, role }, callback) {
    const query = `
      INSERT INTO user (username, email, password_hash, phone, role)
      VALUES (?, ?, ?, ?, ?)
    `;
    this.db.run(query, [username, email, password, phone, role], callback);
  }

  findByCredentials(username, password, callback) {
    const query = "SELECT * FROM user WHERE username = ? AND password_hash = ?";
    this.db.get(query, [username, password], callback);
  }
}

export default UserModel;
