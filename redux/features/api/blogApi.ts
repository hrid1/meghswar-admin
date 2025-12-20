import { Post } from '@/types/Post';
import { baseApi } from './baseApi';


export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: ['Post'],
    //   providesTags: (result) =>
    //     result
    //       ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), { type: 'Post', id: 'LIST' }]
    //       : [{ type: 'Post', id: 'LIST' }],
    }),

    getPost: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    updatePost: builder.mutation<Post, { id: string; updates: Partial<Post> }>({
      query: ({ id, updates }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    //   invalidatesTags: (result, error, id) => [{ type: 'Post', id }, { type: 'Post', id: 'LIST' }],
    }),

    deletePost: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }, { type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;