import express from 'express';
import { createUserInfo } from '../controllers/userInfoController.js';
import { createCompanyInfo } from '../controllers/companyInfoController.js';
import { createLeadInfo } from '../controllers/leadInfoController.js';
import { createAddressInfo } from '../controllers/addressInfoController.js';

const router = express.Router();

// Create a new lead
router.post('/', async (req, res) => {
  try {
    const { firstName, title, phone, mobile, email, skypeId, secondaryEmail, twitter,
            company, fax, website, annualRevenue, employees, description,
            leadOwner, leadSource, industry, leadStatus, leadRating,
            street, city, state, zipCode, country } = req.body;

    // Save user info
    const userInfo = await createUserInfo({ firstName, title, phone, mobile, email, skypeId, secondaryEmail, twitter });

    // Save company info
    const companyInfo = await createCompanyInfo({ company, fax, website, annualRevenue, employees, description });

    // Save lead info
    const leadInfo = await createLeadInfo({ leadOwner, leadSource, industry, leadStatus, leadRating });

    // Save address info
    const addressInfo = await createAddressInfo({ street, city, state, zipCode, country });

    res.status(201).send({ userInfo, companyInfo, leadInfo, addressInfo });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
