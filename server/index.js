/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable global-require */
require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { client, checkCache } = require('./cache.js');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const clientBundles = './public/services';
const serviceConfig = require('./service-config.json');
const loader = require('./loader.js');

const HTML = require('./templates/layout');
const ComponentTags = require('./templates/app');
const ScriptTags = require('./templates/scripts');

const renderComponents = (components) => {
  const services = {};
  components.forEach((component) => {
    services[Object.keys(component)[0]] = component[Object.keys(component)[0]];
  });
  return services;
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(`/${process.env.LOADERIO}.txt`, express.static(path.join(__dirname, `../${process.env.LOADERIO}.txt`)));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/:id', checkCache, async (req, res) => {
  const data = await loader(clientBundles, serviceConfig, req.params.id);
  const services = renderComponents(data);
  const divs = ComponentTags(services);
  const scripts = ScriptTags(services);
  const results = HTML(divs, scripts);

  client.setex(req.params.id, 3600, results);
  res.end(results);
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
