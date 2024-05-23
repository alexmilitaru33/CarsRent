const User = require('../models/Users'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const invalidTokens = new Set();

exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).send({ message: 'Token is required' });
  }

  // Add the token to the set of invalid tokens
  invalidTokens.add(token);

  res.send({ message: 'Logout successful' });
};


exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body; // role = user by default, daca e alta valoare in request body se schimba
    const user = await User.create({ username, email, password, role });
    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user', error });
  }
}


exports.register = async (req, res) => {
  try {
    const { username, email, password, role = 'user' } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).send({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ message: 'Registration failed', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);  // Log email corect

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("No user found with that email"); // exista utilizatorul
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, // Cheia secreta
      { expiresIn: '24h' }
    );

    res.send({ message: "Login successful", token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Login failed', error });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.send({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Error updating user', error });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    await user.destroy();
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Error deleting user', error });
  }
};

exports.invalidTokens = invalidTokens;
