import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { CustomerService } from '../../service/CustomerService';
import { useGetLoansByUserIdQuery, useDeleteLoanItemMutation, useUpdateLoanStatusMutation, useUpdateLoanApprovalMutation, useUpdateLoanTakeMutation, useUpdateReturnApprovalMutation } from "./loanApiSlice";
import { Button } from 'primereact/button';
import apiSlice from '../../App/apiSlice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import ShowWefts from './showWefts';
import Confirmation from '../../Components/confirmation';
export default function ListLoanUser() {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [id, setId] = useState('')
    const [ReturnApproval, { isError: isError1, isSuccess: isSuccess1 }] = useUpdateReturnApprovalMutation()
    const [idLoan, setIdLoan] = useState(null);
    const [view, setView] = useState(false);
    const [rowD, setRowD] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMoDe: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [viewConfi, setViewConfi] = useState(false)

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [delFunc] = useDeleteLoanItemMutation()
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);
    const { data: allLoans, isLoading, isError, error, refetch } = useGetLoansByUserIdQuery()

    const handleDeleteLoan = async (idlo) => {
        // console.log(idL);
        setIdLoan(idlo)
        console.log(idlo + " 00000");
        await delFunc({ idL: idlo })
    }



    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => {
            setCustomers(getCustomers(data));
            setLoading(false);
        });
    }, []);

    const handleCloseWeftsDialog = () => {
        setView(false)  
        setDialogVisible(false)
    }

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);  
            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

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

    const userBodyTemplate = (rowData) => {
        const user = rowData.user
        return (
            <div className="flex align-items-center gap-2">
                {user ? <span>{'identity:' + user?.identity} {'name:' + user?.name} <br /> {user?.phone} {user?.email} {user?.address}</span> : <></>}
            </div>
        );
    };

    const CountBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.request.count);
    };

    const handleFileChange = (event, id) => {
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('id', id);
        formData.append('Img', event.target.files[0]);
        console.log(formData.get('Img'));
        // debugger
        ReturnApproval(formData)
    };
    const handleViewCon=(id)=>{
        setId(id);
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: "Are you sure you want to delete this loan?",
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            // accept,
            // reject
        });
        setViewConfi(true)
    }
    const actionButtons = (rowData) => {
        return (<>
            {!rowData.take ? <div >
                <Button icon='pi pi-trash' onClick={() => handleViewCon(rowData._id)}></Button>
               
            </div> :
                <div >
                    <input style={{}} icon='pi pi-upload' type="file" name="Img" onChange={(e) => handleFileChange(e, rowData._id)} />
                </div>
            }
        </>)
    }

    const handleOpenDialog = (rowData) => {
        setRowD(rowData.wefts)
        setIdLoan(rowData._id)
        setView(true)
        setDialogVisible(true)
        console.log(rowData.wefts);
    }

    const weftsButtons = (rowData) => {
        // setRowD(rowData)
        // console.log(rowData);
        // console.log('weftsButtons rowData', rowData);
        return (
            <div>
                <Button icon='pi pi-sort-down' onClick={() => handleOpenDialog(rowData)}></Button>
                {view ? <ShowWefts setRowD={setRowD} wefts={rowD} dialogVisible={dialogVisible} idLoan={idLoan} setDialogVisible={handleCloseWeftsDialog} refetch={refetch} role={true}></ShowWefts> : ""}
            </div>
        )
    }


    const checkStatus = (rowData) => {
        return <i className={classNames('pi', { 'text-primary-500 pi-check-circle': rowData.status, 'text-primary-500 pi-times-circle': !rowData.status })}></i>;
    }
    const checkTake = (rowData) => {
        return <i className={classNames('pi', { 'text-primary-500 pi-check-circle': rowData.take, 'text-primary-500 pi-times-circle': !rowData.take })}></i>;

    }

    const checkApproval = (rowData) => {
        return <i className={classNames('pi', { 'text-primary-500 pi-check-circle': rowData.approval, 'text-primary-500 pi-times-circle': !rowData.approval })}></i>;

    }
    const header = renderHeader();

    return (
        <div className="card">
             <Confirmation func={handleDeleteLoan} id={id} confirmDialog={confirmDialog}></Confirmation>
            <DataTable value={allLoans} paginator rows={10} dataKey="_id" filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={['updatedAt', 'approval', 'take', 'status']} header={header} emptyMessage="No loans found.">
                <Column field="createdAt" header="createdAt" bodyClassName="text-center" style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="updatedAt" header="updatedAt" bodyClassName="text-center"  style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="request.count" header="Count" body={CountBodyTemplate} bodyClassName="text-center" style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column header="Show wefts" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={weftsButtons} />
                <Column field="approval" header="Is approval?" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkApproval} />
                <Column field="take" header="Is Take?" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkTake} />
                <Column field="status" header="Return status" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkStatus} />
                <Column header="Delete/Approval" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={actionButtons} />
            </DataTable>
        </div>
    );
}