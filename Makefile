.PHONY: build
build: ## Build containers
	docker compose build --no-cache

.PHONY: up
up: ## Start containers
	docker compose up -d

.PHONY: down
down: ## Stop containers
	docker compose down

.PHONY: seed
seed: ## Seed database
	$(eval DB_HOST := $(shell docker compose exec -T grpc printenv DB_HOST))
	$(eval DB_PORT := $(shell docker compose exec -T grpc printenv DB_PORT))
	$(eval DB_USER := $(shell docker compose exec -T grpc printenv DB_USER))
	$(eval DB_PASSWORD := $(shell docker compose exec -T grpc printenv DB_PASSWORD))
	$(eval DB_NAME := $(shell docker compose exec -T grpc printenv DB_NAME))
	docker compose exec -T grpc \
		go run ./tools/seeder/main.go \
			--host=${DB_HOST} \
			--port=${DB_PORT} \
			--user=${DB_USER} \
			--password=${DB_PASSWORD} \
			--dbname=${DB_NAME} \
			--sslmode=disable

.PHONY: gen
gen: ## Generate pb files
	docker compose exec -T grpc /workspace/scripts/gen-go.sh && \
		docker compose exec -T frontend /workspace/scripts/gen-js-ts.sh

.PHONY: pg-dev
pg-dev: ## Connect to postgres
	./scripts/connect-postgres.sh -e dev -p 15432
