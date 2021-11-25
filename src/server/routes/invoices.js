const express = require('express');
const router = express.Router();
const format = require('pg-format');

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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await pool.query(
      `
        SELECT  
          name AS "invoiceName", 
          company_name AS "toCompany", 
          client_address AS "toAddress", 
          client_city AS "toCity", 
          client_pib AS "toPib", 
          closing_date AS "closingDate", 
          stamp_needed AS "stampNeeded", 
          sign_needed AS "signNeeded", 
          invoices.pdv AS pdv 
        FROM invoices
        WHERE id = '${id}';
      `
    );

    const services = await pool.query(
      `
        SELECT 
          id, 
          service_type as "serviceType", 
          unit, 
          amount, 
          price_per_unit as "pricePerUnit", 
          amount * price_per_unit AS price
        FROM services
        WHERE invoice_id = '${id}';
      `
    );

    res.json({ exchangeData: invoice.rows[0], services: services.rows });
  } catch (err) {
    res.status(500).json({ error: 'Greska u aplikaciji!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const invoiceId = await pool.query(
      `
        INSERT INTO 
          invoices(
              name, 
              company_name, 
              client_address, 
              client_city, 
              client_pib, 
              closing_date, 
              stamp_needed, 
              sign_needed, 
              pdv
          )
        VALUES(
            '${body.invoiceName}', 
            '${body.companyName}', 
            '${body.address}', 
            '${body.city}', 
            '${body.pib}', 
            '${body.closingDate}', 
            '${body.stamp}', 
            '${body.sign}', 
            '${body.pdv}'
        );   

        SELECT CURRVAL(pg_get_serial_sequence('invoices','id'))
      `
    );

    res.send(invoiceId[1].rows[0].currval);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Greska u aplikaciji!' });
  }
});

router.post('/create-services/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    let services = req.body;
    services = services.map((service) =>
      Object.values({ invoiceId, ...service })
    );

    await pool.query(
      format(
        'INSERT INTO services(invoice_id, service_type, unit, amount, price_per_unit)VALUES %L',
        services
      ),
      []
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Greska u aplikaciji!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `
        DELETE FROM invoices
        WHERE id = '${id}' 
      `
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Greska u aplikaciji!' });
  }
});

module.exports = router;
