import { NextResponse } from "next/server"

type ErrorResponse = {
  message: string
}

export const error = (message: string, statusCode: number) => {
  return NextResponse.json(
    {
      error: {
        message: message,
      },
    },
    { status: statusCode }
  )
}

export const errBadRequest = (message: string) => {
  return error(message, 400)
}

export const errNotFound = (message: string) => {
  return error(message, 404)
}

export const errInternal = (message: string) => {
  return error(message, 500)
}
