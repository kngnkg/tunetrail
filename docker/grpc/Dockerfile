FROM golang:1.21-bullseye as dev

ENV GO111MODULE on
ARG PROTOBUF_VERSION=24.4

# protocをインストールするためにunzipを用意
RUN apt-get update && apt-get install unzip

# protocのダウンロード
WORKDIR /tmp/protoc
RUN curl -L https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOBUF_VERSION}/protoc-${PROTOBUF_VERSION}-linux-x86_64.zip -o protoc.zip && \
    unzip protoc.zip && \
    mv bin/* /usr/local/bin/ && \
    mv include/* /usr/local/include/

WORKDIR /workspace/backend

RUN apt-get update && apt-get install -y postgresql-client && \
    go install github.com/uudashr/gopkgs/v2/cmd/gopkgs@latest && \
    go install github.com/go-delve/delve/cmd/dlv@latest && \
    go install github.com/ramya-rao-a/go-outline@latest && \
    go install github.com/stamblerre/gocode@latest && \
    go install golang.org/x/tools/gopls@latest && \
    go install honnef.co/go/tools/cmd/staticcheck@latest && \
    go install github.com/k0kubun/sqldef/cmd/psqldef@latest && \
    go install github.com/cosmtrek/air@latest && \
    go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# $GOPATH/bin を PATH に追加
ENV PATH $PATH:/go/bin

ENTRYPOINT [ "../scripts/grpc-entry.sh" ]
