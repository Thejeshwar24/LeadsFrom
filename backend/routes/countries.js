import express from 'express';
import { getCountries } from '../controllers/countryController.js';

const router = express.Router();

// Get all countries
router.get('/', async (req, res) => {
  try {
    const countries = await getCountries();
    res.status(200).send(countries);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
