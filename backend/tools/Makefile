.PHONY: dry-migrate
dry-migrate: ## Try migration
	psqldef --dry-run \
		--enable-drop-table \
		--host=${DB_HOST} \
		--port=${DB_PORT} \
		--user=${DB_USER} \
		--password=${DB_PASSWORD} \
		${DB_NAME} \
		< ./_tools/postgres/schema.sql

.PHONY: migrate
migrate:  ## Execute migration
	psqldef --enable-drop-table \
		--host=${DB_HOST} \
		--port=${DB_PORT} \
		--user=${DB_USER} \
		--password=${DB_PASSWORD} \
		${DB_NAME} \
		< ./_tools/postgres/schema.sql

.PHONY: seed
seed: ## Seed data
	./seeder \
		--host=${DB_HOST} \
		--port=${DB_PORT} \
		--user=${DB_USER} \
		--password=${DB_PASSWORD} \
		--dbname=${DB_NAME} \
		--sslmode=require
