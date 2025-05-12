const express = require('express');
const router = express.Router();
const VacancyResponse = require('../models/VacancyResponse');
const TaskResponse = require('../models/TaskResponse');
const Task = require('../models/Task');
const mongoose = require('mongoose');

// Get all vacancy responses
router.get('/vacancy', async (req, res) => {
  try {
    const { vacancyId } = req.query;
    const query = vacancyId ? { vacancyId } : {};
    const responses = await VacancyResponse.find(query)
      .populate('userId', 'username')
      .populate('vacancyId', 'title');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create vacancy response
router.post('/vacancy', async (req, res) => {
  try {
    const response = new VacancyResponse({
      ...req.body,
      id: new mongoose.Types.ObjectId().toString() // Для совместимости с JSON Server
    });
    const savedResponse = await response.save();
    res.status(201).json(savedResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update vacancy response status
router.patch('/vacancy/:id', async (req, res) => {
  try {
    const response = await VacancyResponse.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all task responses
router.get('/task', async (req, res) => {
  try {
    const { taskId } = req.query;
    const query = taskId ? { taskId } : {};
    const responses = await TaskResponse.find(query)
      .populate('userId', 'username')
      .populate('taskId', 'title');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task response
router.post('/task', async (req, res) => {
  try {
    const { taskId, userId, message, proposedPrice, estimatedTime, portfolio } = req.body;

    if (!taskId || !userId || !message) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Update task status to in-progress
    await Task.findByIdAndUpdate(taskId, { status: 'in-progress' });

    const response = new TaskResponse({
      taskId,
      userId,
      message,
      proposedPrice,
      estimatedTime,
      portfolio,
      status: 'pending',
      id: new mongoose.Types.ObjectId().toString() // Для совместимости с JSON Server
    });

    const savedResponse = await response.save();
    res.status(201).json(savedResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task response status
router.patch('/task/:id', async (req, res) => {
  try {
    const response = await TaskResponse.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 