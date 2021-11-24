const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const invoicesRouter = require('./routes/invoices');

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/invoices', invoicesRouter);

app.listen(PORT);
