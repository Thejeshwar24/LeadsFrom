import express from 'express';
import { getOwners } from '../controllers/ownerController.js';

const router = express.Router();

// Get all owners
router.get('/', async (req, res) => {
  try {
    const owners = await getOwners();
    res.status(200).send(owners);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
