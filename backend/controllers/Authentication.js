const Customer = require("../models/Customer");
const Administrator = require("../models/Administrator");

class Authentication {
  constructor(userModel) {
    this.userModel = userModel;
  }

  register = (req, res) => {
    const { username, email, password, phone, role } = req.body;

    const phoneRegex = /^04\d{8}$/;
        if (!phoneRegex.test(phone)) {
        return res.status(400).json({success: false,message: "Invalid phone number format. It must be in the form 04xxxxxxxx.",});
    }

    this.userModel.findByUsernameOrEmail(username, email, (err, existingUser) => {
      if (err) {
        console.error("DB error:", err.message);
        return res.status(500).json({ success: false, message: "Database error during verification." });
      }

      if (existingUser) {
        return res.status(409).json({ success: false, message: "Username or email already exists." });
      }

      this.userModel.insertUser({ username, email, password, phone, role }, (err) => {
        if (err) {
          console.error("Insert error:", err.message);
          return res.status(500).json({ success: false, message: "Database error during registration." });
        }
        return res.status(201).json({ success: true, message: "Registration successful." });
      });
    });
  };

  login = (req, res) => {
    const { username, password } = req.body;

    this.userModel.findByCredentials(username, password, (err, userRow) => {
      if (err) {
        console.error("DB error:", err.message);
        return res.status(500).json({ success: false, message: "Database error during login." });
      }

      if (!userRow) {
        return res.status(401).json({ success: false, message: "Invalid username or password." });
      }

      let user;
      if (userRow.role === "administrator") {
        user = new Administrator(userRow.id, userRow.username, userRow.email, userRow.phone);
      } else {
        user = new Customer(userRow.id, userRow.username, userRow.email, userRow.phone);
      }

      return res.json({
        success: true,
        message: "Login successful.",
        user: user.getBasicInfo(),
      });
    });
  };
}

module.exports = Authentication;
