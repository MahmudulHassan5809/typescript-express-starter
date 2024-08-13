#!/bin/bash
set -e

# Log environment variables
echo "DB_HOST: $DB_HOST"
echo "DB_USERNAME: $DB_USERNAME"
echo "DB_NAME: $DB_NAME"

# Wait for PostgreSQL to be ready
until PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USERNAME" -d postgres -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

# Create the database if it doesn't exist
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USERNAME" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USERNAME" -d postgres -c "CREATE DATABASE \"$DB_NAME\""

# Define model names and their corresponding migration directories
# npm run typeorm:generate src/migrations/initial_migration
# Run migrations
npm run typeorm:migrate

# Start the application
exec "$@"
