# Node App - Server

This repository contains the Node App developed using Node JS and other server side technologies.


## Developers
* Vigan Abdurrahmani - 27/02/2018


## Technologies ##
* Node JS: [https://nodejs.org/](https://nodejs.org/)
* Docker: [https://www.docker.com/](https://www.docker.com/)
* Mongo DB: [https://mongodb.com/](https://mongodb.com/)


## Setup

### Prequises
In order to run the project you must have configured the following softwares/services in your hosting environment:
* Docker - [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
* Docker-Compose - [https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04)

If you prefer to manage all the required technologies without docker then you have to install the following services:
* Node JS v8.9.2 - [https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
* Mongo DB - [https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)


### Server Configuration via Docker

**Before setting up the project make sure you have installed the following packages:**
* Docker CE,
* Docker Compose

The project can be setup on live environment just by using the following command:
```terminal
./install.sh
```

In case if you want to run the project on development environment just use the following command:
```terminal
./install.sh --dev
```

To remove the project completely from the environment use:
```terminal
./uninstall.sh
```

To stop the docker container (not delete) use:
```terminal
./stop.sh
```

To start the docker container (in case if it's stopped) use:
```terminal
./start.sh
```

### Server Configuration without Docker
First you have to install the node modules in root directory via:
```terminal
npm install
```

After that you can start the server in production or development mode via `npm run start:dev` or npm `run start:prod`

In case if you're using nginx here's a simple configuration file that may help you to setup the system:
```nginx
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:4000;
  }

  location /api {
    proxy_pass http://127.0.0.1:4001;
  }

  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto https;
  proxy_set_header X-Forwarded-Port 443;
  proxy_set_header Host $host;
}
```


## API Documentation
In order to generate the full API documentation for the system you just have to run the following command:
```terminal
npm run doc
```

In case if you've installed the system via Docker then you must first access the container via bash with the following command:
```terminal
docker exec -it node_app_server bash
```

## Running Test
In order to run test you just have to run the following command:
```terminal
npm run test
```

## Running CLI Env
In order to run cli commands supported from your app run the following command:
```terminal
npm run cli -- <args>
```
In staging or production run:
```terminal
npm run cli:<staging|prod> -- <args>

If you're using Docker don't forget to access the container first as mentioned in "API Documentation" section!