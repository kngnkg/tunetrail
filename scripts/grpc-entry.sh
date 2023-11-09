#!/bin/sh

# データベースが起動するのを待つ
until pg_isready -h tunetrail-db -p 5432; do
  echo "Waiting for database to be ready..."
  sleep 2
done

# データベースが準備できたら gRPC サービスを起動
air -c .air.toml
