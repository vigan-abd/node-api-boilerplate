#!/bin/bash
APP_CONTAINER="node_app_server"
DB_CONTAINER="node_app_db"
DB_ADMIN_USR="root"
DB_ADMIN_PWD="root"
DB_ADMIN_DBNAME="admin"
DB_WWW_USR="www"
DB_WWW_PWD="www"
DB_WWW_DBNAME="node_app"
DB_TEST_NAME="node_app_test"

DOCKER_CMD="docker"
DOCKER_COMPOSE_CMD="docker-compose"


if [ ! -f "app.log" ]; then
  touch app.log
fi


if [ "$1" == "--dev" ]; then
  cp Dockerfile.development Dockerfile
elif [ "$1" == '--staging' ]; then
  cp Dockerfile.staging Dockerfile
else
  cp Dockerfile.production Dockerfile
fi


echo "Installing Node App - Server >>>"

## Boot db microservice
$DOCKER_COMPOSE_CMD up -d $DB_CONTAINER;

## Build node microservice
$DOCKER_COMPOSE_CMD build $APP_CONTAINER;

## Setup client database on db microservice
$DOCKER_CMD exec -it $DB_CONTAINER mongo $DB_ADMIN_DBNAME -u $DB_ADMIN_USR -p $DB_ADMIN_PWD --eval "db.createUser({ \
  user: '$DB_WWW_USR',\
  pwd: '$DB_WWW_PWD',\
  roles: [\
    {role: 'readWrite', db: '$DB_WWW_DBNAME'},\
    {role: 'readWrite', db: '$DB_TEST_NAME'}\
  ]\
});"
$DOCKER_CMD exec -it $DB_CONTAINER mongo $DB_WWW_DBNAME -u $DB_WWW_USR -p $DB_WWW_PWD --authenticationDatabase $DB_ADMIN_DBNAME --eval "db.bootLogs.insert({ message: '$DB_WWW_DBNAME database created on ' + new Date() });"
$DOCKER_CMD exec -it $DB_CONTAINER mongo $DB_WWW_DBNAME -u $DB_WWW_USR -p $DB_WWW_PWD --authenticationDatabase $DB_ADMIN_DBNAME --eval "db.bootLogs.isCapped();"

$DOCKER_CMD exec -it $DB_CONTAINER mongo $DB_TEST_NAME -u $DB_WWW_USR -p $DB_WWW_PWD --authenticationDatabase $DB_ADMIN_DBNAME --eval "db.bootLogs.insert({ message: '$DB_TEST_NAME database created on ' + new Date() })";
$DOCKER_CMD exec -it $DB_CONTAINER mongo $DB_TEST_NAME -u $DB_WWW_USR -p $DB_WWW_PWD --authenticationDatabase $DB_ADMIN_DBNAME --eval "db.bootLogs.isCapped();"

## Boot node microservice
if [ "$1" == "--dev" ]; then
  $DOCKER_COMPOSE_CMD up $APP_CONTAINER;
elif [ "$1" == '--staging' ]; then
  $DOCKER_COMPOSE_CMD up -d $APP_CONTAINER;
else
  if [ ! -f "./src/config/production.env" ]; then
    cp ./src/config/staging.env ./src/config/production.env
  fi

  $DOCKER_COMPOSE_CMD up -d $DB_CONTAINER;
  $DOCKER_COMPOSE_CMD up -d $APP_CONTAINER;
fi