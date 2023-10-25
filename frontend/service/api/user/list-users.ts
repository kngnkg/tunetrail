import { UserServiceClient } from "@/generated/user/user_grpc_pb"
import { ListUsersRequest, UserListReply } from "@/generated/user/user_pb"
import * as grpc from "@grpc/grpc-js"

interface listUsersParams {
  userIds: string[]
  displayIds: string[]
}
export const listUsers = (
  apiRoot: string,
  params: listUsersParams
): Promise<UserListReply | null> => {
  const client = new UserServiceClient(
    apiRoot,
    grpc.credentials.createInsecure()
  )
  const { userIds, displayIds } = params

  const req = new ListUsersRequest()

  if (userIds.length > 0) {
    req.setUseridsList(userIds)
  }

  if (displayIds.length > 0) {
    req.setDisplayidsList(displayIds)
  }

  return new Promise((resolve, reject) => {
    client.listUsers(req, (err, response) => {
      if (err) reject(err)

      if (!response) return

      resolve(response)
    })
  })
}
