import { NextRequest, NextResponse } from "next/server"
import CognitoIdentityServiceProvider, * as CognitoIdp from "aws-sdk/clients/cognitoidentityserviceprovider"

import { env } from "@/env.mjs"

export async function POST(request: NextRequest) {
  try {
    const cognitoIdpClient = new CognitoIdentityServiceProvider({
      region: env.AWS_REGION,
    })
  } catch (e) {
    console.error(e)
    return errInternal("internal error")
  }
}
