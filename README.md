# Coursera Clone Proxy

![Proxy Screenshot](https://vbao-readme-screenshots.s3.us-west-1.amazonaws.com/sdc_proxy_screenshot.png)

This repo contains the proxy of an Coursera clone. The proxy serves the static contents of a clone Coursera course page and will serve each service by making requests to the service bundles via server side rendering.

On deployment, this repo can deploy via Docker, Node, or PM2.

## Related Projects

- [About Service](https://github.com/rpt26-sdc-factory/james-about-service)
- [Instructors Service](https://github.com/rpt26-sdc-factory/vbao-instructor-service)
- [Syllabi Service](https://github.com/rpt26-sdc-factory/kim-syllabi-service)
- [Title Banner Service](https://github.com/rpt26-sdc-factory/anthony-titleBanner-service)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Deployment](#deployment)

## Usage

Running and deploying this app should be fairly straight forward. The app can be deployed via Node, PM2 or Docker.

## Requirements

- Node
- NGINX (load balancing)
- Redis (caching)
- Docker (optional for deployment)
- PM2 (optional for deployment)

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack webpack-cli
npm install
```

## Deployment

### Network Architecture

![Network Architecture](https://vbao-readme-screenshots.s3.us-west-1.amazonaws.com/sdc_network_architecture.png)

### Caching (Redis)

Redis is already configured for the most part, but must be installed for caching. The cache is a structure of key value pairs and stores the services' pre-rendered html based on the course ID/course number.

### Load Balancing (NGINX)

If load balancing is desired, NGINX should also be installed. The nginx.conf file was configured as follows:

```conf
worker_rlimit_nofile 16384;

events {
  worker_connections 10000;
}

http {
  log_format upstreamlog `$server_name to: $upstream_addr [$request]
  'upstream_response_time $upsteram_response_time `
  'msec $msec request_time $request_time';

  error_log /var/log/nginx/error_log crit;

  upstream api {
    server <server1.com>;
    server <server2.com>
    server <server3.com>
  }

  server {
    listen 80;
    server_name loadbalancer;
    access_log /var/log/nginx/access.log upstreamlog;
    location / {
      proxy_pass http://api;
    }
  }
}
```

`upstream api` is a list of all the servers designated for load balancing. They are essentially server clones of the services.

Access request logs via:

`tail -f /var/log/nginx/access.log`

Access error logs via:

`tail -f /var/log/nginx/error_log`

The increased worker limits allows for high request rates with 4481ms latency and 0% error rate, testing 1000RPS and range of the last 100k records in a table of 10 million primary records.
