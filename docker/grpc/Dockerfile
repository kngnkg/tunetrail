FROM golang:1.21.1 as dev

ENV GO111MODULE on

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

CMD ["air", "-c", ".air.toml"]
