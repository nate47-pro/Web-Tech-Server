const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

const getUsers = () => {
  const data = fs.readFileSync('users.json');
  return JSON.parse(data);
};

app.get('/', (req, res) => {
  res.send('Welcome to the Users API');
});

app.get('/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = getUsers();
  const user = Object.values(users).find(user => user.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/users/profession/:profession', (req, res) => {
  const users = getUsers();
  const filteredUsers = Object.values(users).filter(user => user.profession === req.params.profession);
  if (filteredUsers.length > 0) {
    res.json(filteredUsers);
  } else {
    res.status(404).send('No users found with that profession');
  }
});

app.get('/users/name/:name', (req, res) => {
  const users = getUsers();
  const user = Object.values(users).find(user => user.name === req.params.name);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});