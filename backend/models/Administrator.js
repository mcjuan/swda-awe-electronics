import Account from "./Account.js";

class Administrator extends Account {
  constructor(id, username, email, phone) {
    super(id, username, email, "administrator", phone);
  }

  getAdminMessage() {
    return `Hello Admin ${this.username}, welcome back.`;
  }
}

export default Administrator;
