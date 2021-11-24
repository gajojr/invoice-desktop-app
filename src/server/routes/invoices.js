const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

router.get('/', async (req, res) => {
  try {
    const invoices = await pool.query(
      `
          SELECT
              id,
              client_address AS address,
              client_city AS city,
              client_pib AS pib,
              name FROM invoices
        `
    );

    res.send(invoices.rows);
  } catch (err) {
    res.status(500).json({ error: 'Greska u aplikaciji!' });
  }
});

module.exports = router;
