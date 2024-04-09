require("dotenv").config();
const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Initialize Supabase client

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Registration route
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, termsAccepted } = req.body;
    const { data, error } = await supabase.from("Users").insert([
      {
        FullName: fullName,
        Email: email,
        Password: password,
        TermsAccepted: termsAccepted,
      },
    ]);

    if (error) {
      throw error;
    }

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
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("Email", email)
      .eq("Password", password)
      .single();

    if (error || !data) {
      throw error || new Error("Invalid email/password");
    }

    res.send(`Login successful for email/username: ${email}`);
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(401).send("Invalid email/password");
  }
});

// Catch-all route to return the main index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
