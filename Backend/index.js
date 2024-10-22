const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');  
const { Server } = require('socket.io'); 

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const MONGO_URI = 'mongodb://localhost:27017/lib';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  bookID: String,
  bookName: String,
  bookAuthorName: String,
});

const User = mongoose.model('data', userSchema);


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); 


io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    
    io.emit('userCreated', savedUser);

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      
      io.emit('userUpdated', updatedUser);
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  

app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    
    io.emit('userDeleted', req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
