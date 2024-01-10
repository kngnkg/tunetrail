import { NextRequest, NextResponse } from "next/server"
import CognitoIdentityServiceProvider, * as CognitoIdp from "aws-sdk/clients/cognitoidentityserviceprovider"

export async function POST(request: NextRequest) {
  try {
    const cognitoIdpClient = new CognitoIdentityServiceProvider({
      region: "ap-northeast-1", // TODO: 環境変数から取得する
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
