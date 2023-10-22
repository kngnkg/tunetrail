FROM golang:1.21.1 as dev

ENV GO111MODULE on

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest && \
    go install github.com/k0kubun/sqldef/cmd/psqldef@latest

# $GOPATH/binをPATHに追加
ENV PATH $PATH:/go/bin

CMD ["air", "-c", ".air.toml"]
