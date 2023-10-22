#! /bin/bash

set -e

DB_HOST="tunetrail-db"
DB_PORT=5432
DB_USER="tunetrail"
DB_PASSWORD="tunetrail"
DB_NAME="tunetrail"

DRY_RUN=""
if [[ "$1" == "dry" ]]; then
    DRY_RUN="--dry-run"
fi

docker-compose exec -T grpc \
    psqldef \
        ${DRY_RUN} \
        --enable-drop-table \
        --host=${DB_HOST} \
        --port=${DB_PORT} \
        --user=${DB_USER} \
        --password=${DB_PASSWORD} \
        ${DB_NAME} \
        < ./_tools/postgres/schema.sql
