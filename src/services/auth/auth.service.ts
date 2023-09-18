import { LoginArgs, LoginResponse } from './auth.types.ts'

import { baseApi } from '@/services/base-api.ts'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        //тут часть кода чтоыб предотвратить беспонечные
        //me запросы, взято откуда-то с гита
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: `v1/auth/me`,
            method: 'GET',
          })

          if (result.error) {
            // but refetch on another error
            return { data: { success: false } }
          }

          return { data: result.data }
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
        query: ({ email, password }) => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: { email, password },
        }),
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useLoginMutation, useGetMeQuery } = authService
