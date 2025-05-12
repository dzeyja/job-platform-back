const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responsibilities: [String],
  requirements: [String],
  conditions: [String],
  company: String,
  location: String,
  salary: String,
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  skills: [String],
  experienceLevel: {
    type: String,
    enum: ['junior', 'middle', 'senior']
  },
  contactEmail: String,
  isActive: {
    type: Boolean,
    default: true
  },
  category: String,
  language: String
}, { timestamps: true });

module.exports = mongoose.model('Vacancy', vacancySchema); 