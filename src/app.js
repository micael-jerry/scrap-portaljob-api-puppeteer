const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const scrappingPortalJob = require('./scrappingPortalJob');
require('dotenv')
  .config();

const middlewares = require('./middlewares');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api-portaljob', async (req, res) => {
  let url = 'https://www.portaljob-madagascar.com/emploi/liste';
  if (!isNaN(parseInt(req.query.page, 10))) {
    url += `/page/${req.query.page}`;
  }
  let data = await scrappingPortalJob(url);
  await res.json(data);
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
