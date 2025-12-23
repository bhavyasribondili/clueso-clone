import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// In-memory users store
const users = [];

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json({ message: "Signup successful" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
  res.json({ token });
});

export default router;
