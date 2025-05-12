const mongoose = require('mongoose');

const taskResponseSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  taskTitle: String,
  portfolio: String,
  proposedPrice: String,
  estimatedTime: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  specialty: String,
  experience: String
}, { timestamps: true });

module.exports = mongoose.model('TaskResponse', taskResponseSchema); 