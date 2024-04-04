import apiSlice from "../../App/apiSlice"
const requestApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getRequests: build.query({
            query: () => ({
                url: '/api/requests' 
            }),
            providesTags:["Requests"]

           
        }),
        getRequestsById: build.query({
            query: () => ({
                url: '/api/requests/ById'
            }),
            providesTags:["Requests"]

        }),
        addRequest: build.mutation({
            query: (count) => ({
                url: "api/requests",
                method: "POST",
                body: count
           }),
           invalidatesTags:["Requests"]
        }),

        deleteRequestItem : build.mutation({
            query: ({id}) => ({
                url: "api/requests/",
                method: "DELETE",
                body: {id:id}
           }),
           invalidatesTags:["Requests"]
        }),
        updateRequestItem : build.mutation({
            query: ({id,count}) => ({
                url: "api/requests/",
                method: "PUT",
                body:{_id:id,count:count}
           }),
           invalidatesTags:["Requests"]
        }),
        updateRequestStatus : build.mutation({
            query: ({id}) => ({
                url: "api/requests/status",
                method: "PUT",
                body:{id:id}
           }),
           invalidatesTags:["Requests"]
        }),
    }),
})
export const { useGetRequestsQuery, useGetRequestsByIdQuery, useAddRequestMutation, useDeleteRequestItemMutation,useUpdateRequestItemMutation, useUpdateRequestStatusMutation} = requestApiSlice