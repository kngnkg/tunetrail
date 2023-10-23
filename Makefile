.PHONY: gen
gen: ## Generate pb files
	./scripts/gen-go.sh && ./scripts/gen-js-ts.sh
