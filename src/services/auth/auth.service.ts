import { baseApi } from '@/services/base-api.ts'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, { email: string; password: string }>({
        query: ({ email, password }) => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: { email, password },
        }),
      }),
      getMe: builder.query({
        query: () => ({
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const { useLoginMutation, useGetMeQuery } = authService
