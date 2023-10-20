.PHONY: test
test:
	go test -race -shuffle=on ./...

.PHONY: gen
gen: ## Generate mocks and test boilerplate
	go generate ./...

.PHONY: gen-pb
gen-pb: ## Generate pb files
	./scripts/gen.sh
