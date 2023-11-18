# 踏み台ホスト用の Dockerfile
# ビルドコンテキストは backend なので注意
FROM --platform=linux/x86_64 golang:1.21-bullseye as deploy-builder

WORKDIR /workspace

RUN apt-get update && \
    go install github.com/sqldef/sqldef/cmd/psqldef@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Seeder をビルド
RUN go build -trimpath -ldflags "-w -s" -o seeder ./tools/seeder

# リリース用のコンテナイメージを作成するステージ
FROM --platform=linux/x86_64 debian:bullseye as deploy

WORKDIR /workspace

# Makefileをコピー
COPY ./tools/Makefile ./Makefile

# スキーマファイルをコピー
COPY ./_tools/postgres/schema.sql ./_tools/postgres/schema.sql

COPY --from=deploy-builder /go/bin/psqldef /bin/psqldef

COPY --from=deploy-builder /workspace/seeder .

COPY --from=deploy-builder /usr/bin/make /usr/bin/make

ENTRYPOINT [ "sleep", "infinity" ]
