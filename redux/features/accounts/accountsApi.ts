import { baseApi } from "../api/baseApi";
import { TAG_TYPES } from "../tagList";
import { CreateAccountBody } from "./accountType";

const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL ACCOUNTS
    getAccounts: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/admin/accounts",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Accounts],
      transformResponse: (response: any) => response.data,
    }),

  

    // CREATE ACCOUNT
    createAccount: builder.mutation<any, CreateAccountBody>({
      query: (body) => ({
        url: "/admin/accounts",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_TYPES.Accounts],
    }),

    // UPDATE ACCOUNT 
  
    updateAccount: builder.mutation<any, { id: string; is_active: boolean }>({
      query: ({ id, is_active }) => ({
        url: `/admin/accounts/${id}`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: [TAG_TYPES.Accounts],
    }),

    // GET ACCOUNT BY ID
    getAccountById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/accounts/${id}`,
        method: "GET",
      }),
      providesTags: [TAG_TYPES.Accounts],
      transformResponse: (response: any) => response.data,
    }),

    // CREATE TRANSACTION

    // {
    //     "from_account_id": "14331743-6090-49b6-ae7d-d2eaf2c9050c",
    //     "to_account_id": "a7f72629-698c-4a91-8d43-259068c54c5e",
    //     "amount": 2000
    // }


    createTransaction: builder.mutation<any, { from_account_id: string; to_account_id: string; amount: number }>({
      query: (body) => ({
        url: "/admin/accounts/transfer",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_TYPES.Accounts, TAG_TYPES.Finance],
    }),

    // ACCOUNT STATEMENTS
    getAccountStatements: builder.query<
      any,
      { id: string; page?: number; limit?: number }
    >({
      query: ({ id, page = 1, limit = 10 }) => ({
        url: `/admin/accounts/${id}/statements`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [TAG_TYPES.Accounts],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useGetAccountByIdQuery,
  useCreateTransactionMutation,
  useGetAccountStatementsQuery,
} = accountApi;