require("dotenv").config();
const express = require("express");
const path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define User model
const User = sequelize.define("User", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  termsAccepted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

// Registration route
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, termsAccepted } = req.body;
    const user = await User.create({
      fullName,
      email,
      password,
      termsAccepted,
    });

    res.send(`Registration successful for email/username: ${email}`);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send("Error registering user");
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new Error("Invalid email/password");
    }

    res.send(`Login successful for email/username: ${email}`);
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(401).send("Invalid email/password");
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
