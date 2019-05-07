#!/bin/bash
APP_CONTAINER="node_app_server"
DB_CONTAINER="node_app_db"
APP_IMG="node_app_server:1.0"
DOCKER_CMD="docker"
DOCKER_COMPOSE_CMD="docker-compose"

echo "Uninstalling Node App - Server <<<"
$DOCKER_CMD stop $APP_CONTAINER
$DOCKER_CMD rm $APP_CONTAINER
$DOCKER_CMD rmi $APP_IMG

$DOCKER_CMD stop $DB_CONTAINER
$DOCKER_CMD rm $DB_CONTAINER