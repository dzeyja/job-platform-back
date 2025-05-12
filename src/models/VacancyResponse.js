const mongoose = require('mongoose');

const vacancyResponseSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  cvlink: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vacancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true
  },
  vacancyTitle: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  specialty: String,
  experience: String
}, { timestamps: true });

module.exports = mongoose.model('VacancyResponse', vacancyResponseSchema); 