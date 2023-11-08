import * as grpc from "@grpc/grpc-js"

export const getMetadata = (idToken: string) => {
  const metadata = new grpc.Metadata()
  metadata.add("Authorization", `Bearer ${idToken}`)
  return metadata
}
