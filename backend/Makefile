.PHONY: test
test:
	go test -race -shuffle=on -cover ./...

.PHONY: gen
gen: ## Generate mocks and test boilerplate
	go generate ./...

.PHONY: gen-pb
gen-pb: ## Generate pb files
	./scripts/gen.sh

.PHONY: dry-migrate
dry-migrate: ## Try migration
	./scripts/migrate.sh dry

.PHONY: migrate
migrate:  ## Execute migration
	./scripts/migrate.sh
