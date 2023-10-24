#! /bin/bash

set -e

# 実行したいSQLファイルのパス
SQL_FILE_PATH="./_tools/postgres/seed.sql"

DB_HOST="tunetrail-db"
DB_PORT=5432
DB_USER="tunetrail"
DB_PASSWORD="tunetrail"
DB_NAME="tunetrail"

# .sqlファイルをコンテナにコピー
docker-compose cp $SQL_FILE_PATH db:/tmp/seed.sql

# コンテナ内でSQLファイルを実行
docker-compose exec -T db \
    psql -d $DB_NAME -U $DB_USER -W $DB_PASSWORD -a -f /tmp/seed.sql

# 実行後、コンテナ内の一時ファイルを削除
docker-compose exec -T db rm /tmp/seed.sql
