.PHONY: gen
gen: ## Generate pb files
	docker compose exec -T grpc /workspace/scripts/gen-go.sh && \
		docker compose exec -T frontend /workspace/scripts/gen-js-ts.sh
