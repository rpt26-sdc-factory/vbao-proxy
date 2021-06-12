/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
const fs = require('fs');
const axios = require('axios');

module.exports = (clientBundle, serverBundle, serviceConfig) => {
  const temp = {};
  Object.keys(serviceConfig).map(async (serviceName) => {
    try {
      const api = serviceConfig[serviceName];

      const clientData = await axios.get(`${api}/${serviceName}.js`);
      const clientFile = fs.createWriteStream(`${clientBundle}/${serviceName}.js`);
      if (clientData.status === 200) clientFile.write(clientData.data, () => console.log('Wrote client file.'));
      clientFile.end();

      const serverData = await axios.get(`${api}/server.js`);
      const serverFile = fs.createWriteStream(`${serverBundle}/${serviceName}.js`);
      if (serverData.status === 200) serverFile.write(serverData.data, () => console.log('Wrote server file.'));
      serverFile.end();

      const componentFile = require(`../${clientBundle}/${serviceName}.js`);
      temp[serviceName] = componentFile;
    } catch (err) {
      return console.error(err);
    }
  });
  return temp;
};
