const Account = require("./Account");

class Customer extends Account {
  constructor(id, username, email, phone) {
    super(id, username, email, "customer", phone);
  }

  getWelcomeMessage() {
    return `Welcome back, customer ${this.username}!`;
  }
}

module.exports = Customer;
