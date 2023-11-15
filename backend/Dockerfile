# リリース用のビルドを行うコンテナイメージを作成するステージ
FROM --platform=linux/x86_64 golang:1.21-bullseye as deploy-builder

WORKDIR /app

# grpc_health_probeのダウンロード
RUN GRPC_HEALTH_PROBE_VERSION=v0.4.13 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -trimpath -ldflags "-w -s" -o app

# リリース用のコンテナイメージを作成するステージ
FROM --platform=linux/x86_64 debian:bullseye-slim as deploy

COPY --from=deploy-builder /app/app .

COPY --from=deploy-builder /bin/grpc_health_probe /bin/grpc_health_probe

ENTRYPOINT ["./app"]

# 開発用のコンテナイメージを作成するステージ
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

# grpc_health_probeのダウンロード
RUN GRPC_HEALTH_PROBE_VERSION=v0.4.13 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

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
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest && \
    go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# $GOPATH/bin を PATH に追加
ENV PATH $PATH:/go/bin

ENTRYPOINT [ "../scripts/grpc-entry.sh" ]
