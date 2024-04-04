import apiSlice from "../../App/apiSlice"
const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: '/api/users' 
            }),
            providesTags:["Users"]
        }),
        getUsersById: build.query({
            query: () => ({
                url: '/api/users/ById'
            }),
            providesTags:["Users"]

        }),
        addUser: build.mutation({
            query: (user) => ({
                url: "api/users",
                method: "POST",
                body: user
           }),
           invalidatesTags:["Users"]
        }),

        deleteUserItem : build.mutation({
            query: ({id}) => ({
                url: "api/users/"+id,
                method: "DELETE"
           }),
           invalidatesTags:["Users"]
        }),
        updateUserItem : build.mutation({
            query: (data) => ({
                url: "api/users/",
                method: "PUT",
                body:data
           }),
           invalidatesTags:["Users"]
        }),
    }),
})
export const { useGetUsersQuery, useGetUsersByIdQuery, useAddUserMutation, useDeleteUserItemMutation,useUpdateUserItemMutation} = userApiSlice 