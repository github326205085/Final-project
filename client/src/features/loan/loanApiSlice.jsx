import apiSlice from "../../App/apiSlice"
const loanApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLoans: build.query({
            query: () => ({
                url: '/api/loans' 
            }),
            providesTags:["loans"]

           
        }),
        getLoansByUserId: build.query({
            query: () => ({
                url: '/api/loans/byUser'
            }),
            providesTags:["loans"]

        }),
        addLoan: build.mutation({
            query: (loan) => ({
                url: "api/loans",
                method: "POST",
                body: loan
           }),
           invalidatesTags:["loans"]
        }),

        deleteLoanItem : build.mutation({
            query: ({idL}) => ({
                url: "api/loans",
                method: "DELETE",
                body: {idL:idL}
           }),
           invalidatesTags:["loans"]
        }),
        updateLoanItem : build.mutation({
            query: ({id,count}) => ({
                url: "api/loans/",
                method: "PUT",
                body:{_id:id,count:count}
           }),
           invalidatesTags:["loans"]
        }),
        updateLoanStatus : build.mutation({
            query: ({id}) => ({
                url: "api/loans/status/"+id,
                method: "PUT",
           }),        
           invalidatesTags:["loans"]
        }),
        updateLoanApproval : build.mutation({
            query: ({id}) => ({
                url: "api/loans/approval/"+id,
                method: "PUT",
           }),
           invalidatesTags:["loans"]
        }),
        updateLoanTake : build.mutation({
            query: ({id}) => ({
                url: "api/loans/take/"+id,
                method: "PUT",
           }),
           invalidatesTags:["loans"]
        }),
        updateLoanWefts : build.mutation({
            query: (wefts) => ({
                url: "api/loans/wefts/",
                method: "PUT",
                body:wefts
           }),
           invalidatesTags:["loans"]
        }),
        updateReturnApproval : build.mutation({
            query: (data) => ({
                url: "api/loans/returnApproval/",
                method: "PUT",
                body:data
           }),
           invalidatesTags:["loans"]
        }),
    }),
})
export const { useGetLoansQuery, useGetLoansByUserIdQuery, useAddLoanMutation, useDeleteLoanItemMutation,useUpdateLoanItemMutation, useUpdateReturnApprovalMutation,useUpdateLoanStatusMutation,useUpdateLoanApprovalMutation,useUpdateLoanTakeMutation,useUpdateLoanWeftsMutation} = loanApiSlice