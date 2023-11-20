.PHONY: gen
gen: ## Generate pb files
	docker compose exec -T grpc /workspace/scripts/gen-go.sh && \
		docker compose exec -T frontend /workspace/scripts/gen-js-ts.sh

.PHONY: pg-dev
pg-dev: ## Connect to postgres
	./scripts/connect-postgres.sh -e dev -p 15432
