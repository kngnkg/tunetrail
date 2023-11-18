.PHONY: dry-migrate
dry-migrate: ## Try migration
	psqldef --dry-run \
		--enable-drop-table \
		--host=${TUNETRAIL_DB_HOST} \
		--port=${TUNETRAIL_DB_PORT} \
		--user=${TUNETRAIL_DB_USER} \
		--password=${TUNETRAIL_DB_PASSWORD} \
		${TUNETRAIL_DB_NAME} \
		< ./_tools/postgres/schema.sql

.PHONY: migrate
migrate:  ## Execute migration
	psqldef --enable-drop-table \
		--host=${TUNETRAIL_DB_HOST} \
		--port=${TUNETRAIL_DB_PORT} \
		--user=${TUNETRAIL_DB_USER} \
		--password=${TUNETRAIL_DB_PASSWORD} \
		${TUNETRAIL_DB_NAME} \
		< ./_tools/postgres/schema.sql

.PHONY: seed
seed: ## Seed data
	./seeder \
		--host=${TUNETRAIL_DB_HOST} \
		--port=${TUNETRAIL_DB_PORT} \
		--user=${TUNETRAIL_DB_USER} \
		--password=${TUNETRAIL_DB_PASSWORD} \
		--dbname=${TUNETRAIL_DB_NAME} \
		--sslmode=require
