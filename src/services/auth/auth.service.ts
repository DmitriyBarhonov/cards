import {
  LoginArgs,
  LoginResponse,
  RecoverPasswordArgs,
  ResendVerificationEmailArgs,
  SignUpArgs,
  SignUpResponse,
  UserDataResponse,
  UserDataUpdate,
} from './auth.types.ts'

import { baseApi } from '@/services/base-api.ts'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        //тут часть кода чтобы предотвратить беспонечные
        //me запросы, взято откуда-то с гита
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: `v1/auth/me`,
            method: 'GET',
          })

          if (result.error) {
            // если нам пришла ошибка, мы все равно присваиваем
            // ее data, кэшируем так как потом data используем для
            // вычисления isAuthorised для редиректа (стр логинизации)
            // if (me && me?.success !== false) return <Navigate to={'/'} />
            // там если success == false то останемся на логине
            return { data: { success: false } }
          }

          //ну а если нету ошибки, присваиваем данные result.data
          // главное чтобы не было success:false
          return { data: result.data as UserDataResponse }
        },
        //чтобы при поулчении ошибки опять не отправлялся запрос
        //так избегются бесконечные запросы
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      updateMe: builder.mutation<UserDataResponse, FormData | UserDataUpdate>({
        query: data => ({
          url: `/v1/auth/me`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Me'],
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
        query: data => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Me'],
      }),
      signUp: builder.mutation<SignUpResponse, SignUpArgs>({
        query: data => ({
          url: `v1/auth/sign-up`,
          method: 'POST',
          body: data,
        }),
        // invalidatesTags: ['Me'],
      }),
      verifyEmail: builder.mutation<void, { code: string }>({
        query: code => ({
          url: `v1/auth/verify-email`,
          method: 'POST',
          body: code,
        }),
      }),
      resendRerification: builder.mutation<void, ResendVerificationEmailArgs>({
        query: ({ userId, subject }) => ({
          url: `v1/auth/resend-verification-email`,
          method: 'POST',
          body: {
            html: '<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:3000/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:3000/confirm-email/##token##',
            userId,
            subject,
          },
        }),
      }),
      logOut: builder.mutation<void, void>({
        query: () => ({
          url: `v1/auth/logout`,
          method: 'POST',
          body: {},
        }),
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        query: ({ email, subject }) => ({
          url: `v1/auth/recover-password`,
          method: 'POST',
          body: {
            html: '<h1>Hi, ##name##</h1><p>Click <a href="##token##">here</a> to recover your password</p>',
            email,
            subject,
          },
        }),
      }),
      resetPassword: builder.mutation<void, { password: string; token: string }>({
        query: ({ password, token }) => ({
          url: `v1/auth/recover-password/${token}`,
          method: 'POST',
          body: password,
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  util,
  useLogOutMutation,
  useGetMeQuery,
  useSignUpMutation,
  useVerifyEmailMutation,
  useUpdateMeMutation,
} = authService
