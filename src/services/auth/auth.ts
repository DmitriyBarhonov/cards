import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, { email: string; password: string }>({
        query: ({ email, password }) => ({
          url: `v1/auth/login`,
          method: 'POST',
          body: { email, password },
        }),
        //когда выполнится запрос и даные придут
        //сд. прошлые данные с этим тегом невалидными
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useLoginMutation } = authApi
