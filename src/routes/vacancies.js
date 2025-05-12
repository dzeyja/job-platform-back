const express = require('express');
const router = express.Router();
const Vacancy = require('../models/Vacancy');

// Get all vacancies
router.get('/', async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's vacancies
router.get('/my-vacancies/:userId', async (req, res) => {
  try {
    const vacancies = await Vacancy.find({ userId: req.params.userId });
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create vacancy
router.post('/', async (req, res) => {
  try {
    const vacancy = new Vacancy(req.body);
    const savedVacancy = await vacancy.save();
    res.status(201).json(savedVacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update vacancy
router.put('/:id', async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete vacancy
router.delete('/:id', async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);
    
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    
    res.json({ message: 'Vacancy deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 