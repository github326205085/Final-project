import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import AddRequest from './addRequest';
import { PrimeIcons } from 'primereact/api';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useGetRequestsByIdQuery, useDeleteRequestItemMutation } from './requestsApiSlice';
import { useGetLoansByUserIdQuery } from '../loan/loanApiSlice'
import PromissoryNote from '../loan/promissoryNote';
import Confirmation from '../../Components/confirmation';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';


export default function RequestList() {
    const [visible, setVisible] = useState(false);
    const [visibleLoan, setVisibleLoan] = useState(false);
    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(false)
    const [state3, setState3] = useState(false)
    const [viewConfi, setViewConfi] = useState(false)
    const [id, setId] = useState('')
    const [foundLoan, setFoundLoan] = useState(null)

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    useEffect(()=>{

    },[foundLoan])

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const items = [
        {
            label: 'File',
            items: [
                { label: 'New', icon: PrimeIcons.PLUS },
            ]
        }
    ];

    const handleViewCon = (id) => {
        setId(id);
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: "Are you sure you want to delete this request?",
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
        });
        setViewConfi(true)
    }
    const handleClickOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setState2(false)
        setState1(false)
        setState3(false)
        setVisible(false);
        setVisibleLoan(false)

    };
    const [delFunc] = useDeleteRequestItemMutation()
    const { data: allLoansOfThisUser, isLoading: isLoading1, isError: isError1, error: error1 } = useGetLoansByUserIdQuery()

    const handleDelRequest = (id) => {
        delFunc({ id: id })
    }
    const handleCloseLoan = () => {
        setState3(false)
        setVisibleLoan(false)
    }
    const handlePutRequest = (id) => {
        console.log(id);
        handleClickOpen()
        setState2(true)
        setId(id);
    }
    const handleAddRequest = () => {
        handleClickOpen()
        setState1(true)
    }
    const handleAddLoan = (id) => {
        setVisibleLoan(true)
        setState3(true)
        setId(id)
    }

    const { data: requests, isLoading, isError, error } = useGetRequestsByIdQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">

                <Button type="button" label="ADD REQUEST" outlined onClick={handleAddRequest} />
                {state1 ? <><AddRequest visible={visible}
                    handleClose={handleClose}
                    type={"Create"}></AddRequest></> : <></>}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
       
    const checkIfExistLoan = (idRequest) => {
        const found =allLoansOfThisUser.find((r)=>JSON.stringify(r.request._id)==JSON.stringify(idRequest))       
        if (found)
            return true
        return false
    }

    const actionButtons = (rowData) => {
        setFoundLoan(checkIfExistLoan(rowData._id))
        return (<>
            {!rowData.status ? <div >
                <Button icon='pi pi-refresh' onClick={() => handlePutRequest(rowData._id)}></Button>
                <span>  </span><span>  </span><span></span><span> </span>
                <Button icon='pi pi-trash' onClick={() => handleViewCon(rowData._id)}></Button>
                {viewConfi ? <Confirmation func={handleDelRequest} id={id} confirmDialog={confirmDialog}></Confirmation> : <></>}
                {state2 ? <>  <AddRequest visible={visible}
                    handleClose={handleClose}
                    type={"Update"}
                    idReq={id} /></> : <></>}
            </div> :
            !checkIfExistLoan(rowData._id)?
                <div >
                    <Button icon='pi pi-upload' onClick={() => handleAddLoan(rowData._id)}></Button>
                    {state3 ? <><PromissoryNote visibleLoan={visibleLoan}
                        handleCloseLoan={handleCloseLoan}
                        idLoan={id} /></> : <></>}
                </div>:<>הוגשה הלוואה עבור בקשה זו</>
            }
        </>)
    }

    const checkStatus = (rowData) => {
      
        return <i className={classNames('pi', { 'text-primary-500 pi-check-circle': rowData.status, 'text-primary-500 pi-times-circle': !rowData.status })}></i>;
    }
    const header = renderHeader();
    // const srch = search();

    return (
        <div className="card">
            <DataTable value={requests} paginator showGridlines rows={10} dataKey="id" header={header} filters={filters} filterDisplay="row" loading={isLoading}
                globalFilterFields={['updatedAt', 'count', 'status']} emptyMessage="No requests found.">
                <Column field="createdAt" header="Create date" style={{ minWidth: '12rem' }} dataType="date" />
                <Column field="updatedAt" header="Update date" dataType="date" style={{ minWidth: '12rem' }} />
                <Column field="count" header="Count" style={{ minWidth: '14rem' }} />
                <Column field="status" header="Status" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={checkStatus} />
                <Column header="Action" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={actionButtons} />
            </DataTable>
        </div>
    );
}