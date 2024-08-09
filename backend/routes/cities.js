import express from 'express';
import { getCities } from '../controllers/cityController.js';

const router = express.Router();

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await getCities();
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
