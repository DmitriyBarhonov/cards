export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  accessToken: string
}

export type SignUpArgs = {
  password: string
  email: string
}

export type SignUpResponse = {
  html: string
  name: string
  password: string
  email: string
  subject: string
  sendConfirmationEmail: false
}

export type ResendVerificationEmailArgs = {
  userId: string
  subject: string
}
export type RecoverPasswordArgs = {
  email: string
  subject: string
}

export type ResponseGetMe = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
