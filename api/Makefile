.PHONY: test
test:
	go test -race -shuffle=on ./...

.PHONY: generate
generate:
	go generate ./...

.PHONY: generate-pb
generate-pb:
	find 'proto' -name '*.proto' -print0 \
	| xargs -0 protoc -I 'proto' \
	--go_out='gen/go' \
	--go_opt=module='github.com/kngnkg/tunetrail/api/gen/go' \
	--go-grpc_out='gen/go' \
	--go-grpc_opt=module='github.com/kngnkg/tunetrail/api/gen/go'
