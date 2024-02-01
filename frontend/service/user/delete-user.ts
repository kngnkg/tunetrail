import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { Empty } from "google-protobuf/google/protobuf/empty_pb"

import { env } from "@/env.mjs"
import { getMetadata } from "@/lib/grpc"

import { client } from "./client"

function deleteUser(idToken: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = new Empty()

    const metadata = getMetadata(idToken)
    client.deleteUser(req, metadata, (err, response) => {
      if (err) {
        return reject(err)
      }
      if (!response) return resolve(false)
      resolve(true)
    })
  })
}

const cognitoClient = new CognitoIdentityProviderClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

async function deleteCognitoUser(username: string): Promise<boolean> {
  const command = new AdminDeleteUserCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: username,
  })

  try {
    // コマンドの実行
    const response = await cognitoClient.send(command)
    if (!response) return false
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

async function getUsernameBySub(sub: string): Promise<string> {
  const command = new ListUsersCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Filter: `sub = "${sub}"`,
  })

  const response = await cognitoClient.send(command)
  if (response.Users && response.Users.length > 0) {
    const result = response.Users[0].Username
    if (!result) throw new Error("User not found")
    return result
  } else {
    throw new Error("User not found")
  }
}

export { deleteUser, deleteCognitoUser, getUsernameBySub }
