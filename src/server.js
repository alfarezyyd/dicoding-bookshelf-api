'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./route');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });
  server.route(routes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();