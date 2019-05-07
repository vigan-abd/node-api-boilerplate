#!/bin/bash
APP_CONTAINER="node_app_server"
DB_CONTAINER="node_app_db"
DOCKER_CMD="docker"
DOCKER_COMPOSE_CMD="docker-compose"
echo "Starting Node App - Server >>>"

$DOCKER_CMD start $APP_CONTAINER
$DOCKER_CMD start $DB_CONTAINER