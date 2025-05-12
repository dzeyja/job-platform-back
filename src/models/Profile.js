const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  first: String,
  lastname: String,
  age: Number,
  city: String,
  avatar: String,
  specialty: String,
  experience: String,
  portfolio: [String],
  bio: String,
  role: {
    type: String,
    enum: ['customer', 'executor']
  },
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema); 