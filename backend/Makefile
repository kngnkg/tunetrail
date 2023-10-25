.PHONY: test
test:
	go test -race -shuffle=on -cover ./...

.PHONY: gen
gen: ## Generate mocks and test boilerplate
	go generate ./...

.PHONY: dry-migrate
dry-migrate: ## Try migration
	./scripts/migrate.sh dry

.PHONY: migrate
migrate:  ## Execute migration
	./scripts/migrate.sh

.PHONY: seed
seed: ## Seed data
	docker-compose exec -T grpc go run ./tools/seeder/main.go
