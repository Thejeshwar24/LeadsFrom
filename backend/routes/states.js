import express from 'express';
import { getStates } from '../controllers/stateController.js';

const router = express.Router();

// Get all states
router.get('/', async (req, res) => {
  try {
    const states = await getStates();
    res.status(200).send(states);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
