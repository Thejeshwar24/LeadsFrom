import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import leadsRoute from './routes/leads.js';
import ownersRoute from './routes/owners.js';
import citiesRoute from './routes/cities.js';
import statesRoute from './routes/states.js';
import countriesRoute from './routes/countries.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/leadsDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/leads', leadsRoute);
app.use('/api/owners', ownersRoute);
app.use('/api/cities', citiesRoute);
app.use('/api/states', statesRoute);
app.use('/api/countries', countriesRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
