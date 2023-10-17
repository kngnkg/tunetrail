test:
	go test -race -shuffle=on ./...

generate:
	go generate ./...

generate-pb:
	find 'proto' -name '*.proto' -print0 \
	| xargs -0 protoc -I 'proto' \
	--go_out='gen/go' \
	--go_opt=module='github.com/kngnkg/tunetrail/api/gen/go' \
	--go-grpc_out='gen/go' \
	--go-grpc_opt=module='github.com/kngnkg/tunetrail/api/gen/go'
