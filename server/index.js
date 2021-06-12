/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const clientBundles = './public/services';
const serverBundles = './server/templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const HTML = require('./templates/layout');
const ComponentTags = require('./templates/app');
const ScriptTags = require('./templates/scripts');

const renderComponents = (components, props = {}) => Object.keys(components).map((component) => {
  const componentElement = React.createElement(components[component], props);
  return ReactDOMServer.renderToString(componentElement);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(`/${process.env.LOADERIO}.txt`, express.static(path.join(__dirname, `../${process.env.LOADERIO}.txt`)));

app.get('/:id', (req, res) => {
  const components = renderComponents(services, { course: req.params.id });
  res.end(HTML(ComponentTags(...components), ScriptTags(Object.keys(services))));
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
