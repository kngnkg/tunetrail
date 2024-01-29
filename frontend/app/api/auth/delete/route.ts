import { NextRequest, NextResponse } from "next/server"
import deleteUser from "@/service/user/delete-user"
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

import { env } from "@/env.mjs"

import { errInternal } from "../../response"

const deleteCognitoUser = async (username: string, userPoolId: string) => {
  const client = new CognitoIdentityProviderClient({
    region: env.AWS_REGION,
  })

  const command = new AdminDeleteUserCommand({
    UserPoolId: userPoolId,
    Username: username,
  })

  try {
    // コマンドの実行
    const response = await client.send(command)
  } catch (e) {
    console.error(e)
  }
}

export async function POST(request: NextRequest) {
  try {
    // ユーザー名を取得

    // ユーザープールIDを取得

    // Cognitoからユーザー情報を削除
    deleteCognitoUser("exampleUsername", "yourUserPoolId")

    // DBからユーザー情報を削除
    deleteUser("exampleUsername")
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
