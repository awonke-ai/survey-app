const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS total,
      ROUND(AVG(age), 1) AS average_age,
      MAX(age) AS oldest,
      MIN(age) AS youngest,

      ROUND(SUM(JSON_CONTAINS(fav_food, '"Pizza"')) / COUNT(*) * 100, 1) AS pizza_percentage,
      ROUND(SUM(JSON_CONTAINS(fav_food, '"Pasta"')) / COUNT(*) * 100, 1) AS pasta_percentage,
      ROUND(SUM(JSON_CONTAINS(fav_food, '"Pap and Wors"')) / COUNT(*) * 100, 1) AS pap_percentage,

      ROUND(AVG(watch_movies_rating), 1) AS watch_movies_rating,
      ROUND(AVG(listen_radio_rating), 1) AS listen_radio_rating,
      ROUND(AVG(eat_out_rating), 1) AS eat_out_avg,
      ROUND(AVG(watch_tv_rating), 1) AS watch_tv_rating
    FROM surveys;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching survey stats:', err.message);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }

    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const {
    name,
    age,
    dob,
    gender,
    fav_food,
    watch_movies_rating,
    listen_radio_rating,
    eat_out_rating,
    watch_tv_rating
  } = req.body;

  const query = `
    INSERT INTO surveys (
      name, age, dob, gender, fav_food,
      watch_movies_rating, listen_radio_rating, eat_out_rating, watch_tv_rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    name, age, dob, gender, JSON.stringify(fav_food),
    watch_movies_rating, listen_radio_rating, eat_out_rating, watch_tv_rating
  ], (err, result) => {
    if (err) {
      console.error('❌ Error saving survey:', err.message);
      return res.status(500).json({ error: 'Failed to save survey' });
    }

    res.json({ message: 'Survey saved successfully' });
  });
});


module.exports = router;
