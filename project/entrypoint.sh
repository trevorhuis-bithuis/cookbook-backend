#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z cookbook-db 5432; do
  sleep 0.1
done

echo "CockroachDB started"

exec "$@"