const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const surveyRoutes = require('./routes/survey');
const db = require('./db'); 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/survey', surveyRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
