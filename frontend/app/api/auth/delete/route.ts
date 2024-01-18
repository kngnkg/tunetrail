import { NextRequest, NextResponse } from "next/server"
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

import { env } from "@/env.mjs"

import { errInternal } from "../../response"

export async function POST(request: NextRequest) {
  try {
    const client = new CognitoIdentityProviderClient({
      region: env.AWS_REGION,
    })

    const deleteUser = async (username: string, userPoolId: string) => {
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

    deleteUser("exampleUsername", "yourUserPoolId")
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
