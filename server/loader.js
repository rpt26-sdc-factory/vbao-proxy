/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const fs = require('fs');
const axios = require('axios');

module.exports = (clientDir, serviceConfig, id) =>
  Promise.all(Object.keys(serviceConfig).map(async (serviceName) => {
    try {
      const api = serviceConfig[serviceName];
      const data = {};
      data[serviceName] = {};

      const clientData = await axios.get(`${api}/${serviceName}.js`);
      const clientFile = fs.createWriteStream(`${clientDir}/${serviceName}.js`);
      if (clientData.status === 200) {
        clientFile.write(clientData.data);
        clientFile.end();
        console.log('Wrote client file.');
        data[serviceName].client = require(`../${clientDir}/${serviceName}.js`);
      }

      const serverData = await axios.get(`${api}/${id}/innerHTML`);
      data[serviceName].server = serverData.data;
      return data;
    } catch (err) {
      return console.error(err);
    }
  }));
