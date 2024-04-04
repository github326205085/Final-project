import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import AddRequest from './addRequest';
import { useGetRequestsQuery, useDeleteRequestItemMutation,useUpdateRequestStatusMutation } from './requestsApiSlice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Confirmation from '../../Components/confirmation';
import { InputText } from 'primereact/inputtext';

export default function RequestListManeger() {

    const [visible, setVisible] = useState(false);
    const [state1, setState1] = useState(false)
    const [state2, setState2] = useState(false)
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [putRequestStatus, { isError:isError1, isSuccess:isSuccess1 }] = useUpdateRequestStatusMutation()
    const [id, setId] = useState('')
    const changeStatus=async(id)=>{
        await putRequestStatus({id})
        console.log(id);  
    }
    const handleClickOpen = () => {
        setVisible(true);
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const handleClose = () => {
        setState2(false)
        setState1(false)
        setVisible(false);

    };
    const [delFunc] = useDeleteRequestItemMutation()

    const handleDelRequest = (id) => {
        delFunc({ id: id })
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

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    
 

    const actionButtons = (rowData) => {
        return (<>
            {!rowData.status ? <div >
                <Button icon='pi pi-refresh' onClick={() => handlePutRequest(rowData._id)}></Button>
                <span>  </span><span>  </span><span>  </span><span>  </span>
                <Button icon='pi pi-trash' onClick={() => handleDelRequest(rowData._id)}></Button>
                {state2 ? <>  <AddRequest visible={visible}
                    handleClose={handleClose}
                    type={"Update"}
                    idReq={id} /></> : <></>}
            </div> :
                <div >
                    <Button icon='pi pi-upload'></Button>
                </div>
            }
        </>)
    }
    const handleViewCon=(idReq)=>{
        setId(idReq);
        console.log(id);
        console.log(idReq);
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: "Are you sure you want to confirm this request?",
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            // accept,
            // reject
        });
        }

    const checkStatus = (rowData) => {
        return (<>
        
            {!rowData.status ? <div >
                <Button icon='pi pi-times-circle'  onClick={() =>handleViewCon(rowData._id)}></Button>              
            </div> :                
                   <> <div > <Button icon='pi pi-check-circle'  onClick={() =>handleViewCon(rowData._id)}></Button></div> </>} 
        </>)
    }
    const { data: allRequests, isLoading, isError, error } = useGetRequestsQuery()
    console.log(allRequests);
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const header = renderHeader();
    return (
        <>
            <div className="card">
           <>   
         <Confirmation func={changeStatus} id={id}  ></Confirmation></>
              <DataTable value={allRequests} paginator showGridlines rows={10} dataKey="id"filters={filters} filterDisplay="row" loading={isLoading}
               globalFilterFields={['user.identity', 'user.name', 'createdAt', 'user.phone', 'user.address', 'status']}  header={header} emptyMessage="No requests found.">
                    <Column field="user.name" header="Name" style={{ minWidth: '10rem' }} />
                    <Column field="user.phone" header="Phone" style={{ minWidth: '10rem' }} />
                    <Column field="user.identity" header="Identity" style={{ minWidth: '10rem' }} />
                    <Column field="user.address" header="Address" style={{ minWidth: '10rem' }} />
                    <Column field="createdAt" header="Create date" style={{ minWidth: '12rem' }} dataType="date" />
                    <Column field="updatedAt" header="Update date" dataType="date" style={{ minWidth: '12rem' }} />
                    <Column field="count" header="Count" style={{ minWidth: '6rem' }} />
                    <Column field="status" header="Status" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={checkStatus} />
                </DataTable>
            </div>
        </>
    );
}
