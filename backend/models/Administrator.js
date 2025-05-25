const Account = require("./Account");

class Administrator extends Account {
  constructor(id, username, email, phone) {
    super(id, username, email, "administrator", phone);
  }

  getAdminMessage() {
    return `Hello Admin ${this.username}, welcome back.`;
  }
}

module.exports = Administrator;
