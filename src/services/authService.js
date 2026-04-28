const jwt = require("jsonwebtoken");
const { users } = require("../models/dataStore");

const JWT_SECRET = "simple-secret-key";

function registerUser({ name, email, password }) {
  const existing = users.find((user) => user.email === email);
  if (existing) {
    throw new Error("Email already registered");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
}

function loginUser({ email, password }) {
  const user = users.find(
    (candidate) => candidate.email === email && candidate.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = { registerUser, loginUser, JWT_SECRET };
