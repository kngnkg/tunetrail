package main

import (
	"log"
	"net"

	helloworld "github.com/kngnkg/tunetrail/api/gen/go/hello_world"
	"github.com/kngnkg/tunetrail/api/infra/server"

	"google.golang.org/grpc"
)

func main() {
	s := grpc.NewServer()

	helloworldServer := server.NewHelloworldServer()
	helloworld.RegisterGreeterServer(s, helloworldServer)

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	log.Println("gRPC server started on :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
