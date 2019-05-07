#!/bin/bash
APP_CONTAINER="node_app_server"
DB_CONTAINER="node_app_db"
DOCKER_CMD="docker"
DOCKER_COMPOSE_CMD="docker-compose"
echo "Starting Node App - Server >>>"

$DOCKER_CMD stop $APP_CONTAINER
$DOCKER_CMD stop $DB_CONTAINER