.PHONY: gen
gen: ## Generate pb files
	docker compose exec -T grpc ./scripts/gen-go.sh && \
	docker compose exec -T frontend ./scripts/gen-js-ts.sh
