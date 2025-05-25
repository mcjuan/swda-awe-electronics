import Account from "./Account.js";

class Customer extends Account {
  constructor(id, username, email, phone) {
    super(id, username, email, "customer", phone);
  }

  getWelcomeMessage() {
    return `Welcome back, customer ${this.username}!`;
  }
}

export default Customer;
