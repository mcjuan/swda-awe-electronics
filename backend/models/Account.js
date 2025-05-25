// backend/models/Account.js
class Account {
  constructor(id, username, email, role, phone) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
    this.phone = phone;
  }

  getBasicInfo() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      phone: this.phone,
    };
  }

  isAdmin() {
    return this.role === "administrator";
  }

  isCustomer() {
    return this.role === "customer";
  }
}

export default Account;
