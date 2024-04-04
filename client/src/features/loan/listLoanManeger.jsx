import React, { useState, useEffect, useRef } from 'react';
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
import { useGetLoansQuery, useDeleteLoanItemMutation, useUpdateLoanStatusMutation, useUpdateLoanApprovalMutation, useUpdateLoanTakeMutation } from "./loanApiSlice";
import { Button } from 'primereact/button';
import apiSlice from '../../App/apiSlice';
import ShowWefts from './showWefts';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Confirmation from '../../Components/confirmation';
import { Navigate, useNavigate } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Message } from 'primereact/message';

export default function ListLoanManeger() {
    const [customers, setCustomers] = useState(null);
    const navigate = useNavigate()

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'user.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [dialogVisible, setDialogVisible] = useState(false)
    const [weftsDialog, setWeftsDialog] = useState(null)
    const [nameAction, setNameAction] = useState(null)
    const [idLoan, setIdLoan] = useState(null);
    const [rowDataState, setRowDataState] = useState(null);
    const [view, setView] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visible, setVisible] = useState(false)

    const [delFunc] = useDeleteLoanItemMutation()
    const handleDeleteLoan = (id) => {
        console.log(id);
        delFunc({ id: id })
    }

    const [putLoanStatus, { isError: isError1, isSuccess: isSuccess1 }] = useUpdateLoanStatusMutation()
    const [putLoanApproval, { isError: isErrorApproval, isSuccess: isSuccessApproval }] = useUpdateLoanApprovalMutation()
    const [putLoanTake, { isError: isErrorTake, isSuccess: isSuccessTake }] = useUpdateLoanTakeMutation()
    const op = useRef(null);
    const ms = useRef(null);
    const [msText, setMsText] = useState(null);
    const { data: allLoans, isLoading, isError, error } = useGetLoansQuery()


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

    const showImg = (rowData) => {

        return (
            <>
                {rowData.img ?
                    <Button type="button" icon="pi pi-image" onClick={(e) => { op.current?.toggle(e); setRowDataState(rowData) }} /> : <></>
                }</>

        )

    }

    const handleViewCon = (nameAction, rowData, text) => {
        setRowDataState(rowData);
        // console.log(rowData);
        setNameAction(nameAction)
        // console.log(rowData);
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: text,
            header: 'Update Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            // accept,
            // reject
        });
    }

    const allChange = (nameAction, rowData) => {
        if (nameAction === 'approval') {
            putLoanApproval({ id: rowData._id })
        }
        if (nameAction === "take") {
            putLoanTake({ id: rowData._id })
        }
        if (nameAction === "status") {
            putLoanStatus({ id: rowData._id })
        }
    }

    const handleOpenPopupOrConf = (nameAction, rowData, text, e) => {
        if (nameAction === 'approval') {
            if (!rowData.take)
                handleViewCon(nameAction, rowData, text)
            else {
                setVisible(true)
                setMsText("לא ניתן לבטל אישור שטר זה לאחר לקיחת ההלוואה")
                ms.current.toggle(e)
            }
        }
        if (nameAction === "take") {
            if (rowData.status) {
                setVisible(true)
                setMsText("לא ניתן לבטל אישור קבלת הלוואה על שטר זה לאחר החזרת ההלוואה")
                ms.current.toggle(e)
            }
            else
                if (!rowData.approval) {
                    setVisible(true)
                    setMsText("לא ניתן לאשר קבלת הלוואה על שטר שלא אושר")
                    ms.current.toggle(e)
                }
                else
                    handleViewCon(nameAction, rowData, text)
        }
        if (nameAction === "status") {
            if (rowData.take)
                handleViewCon(nameAction, rowData, text)
            else {
                if (!rowData.approval) {
                    setVisible(true)
                    setMsText("אין אפשרות להחזיר הלוואה שלא אושרה")
                    ms.current.toggle(e)
                }
                else
                
                {
                    setVisible(true)
                    setMsText("אין אפשרות להחזיר הלוואה שלא נלקחה")
                    ms.current.toggle(e)
                }


            }
        }
    }
    const checkStatus = (rowData) => {
        return (<>
            {!rowData.status ? <div >
                <Button icon='pi pi-times-circle' onClick={(e) => handleOpenPopupOrConf("status", rowData, "Are you sure you want to approval returnStatus this loan?", e)}></Button>
            </div> :
                <>
                    <div > <Button icon='pi pi-check-circle' onClick={(e) => handleOpenPopupOrConf("status", rowData, "Are you sure you want to cancel returnStatus this loan?", e)}></Button></div>
                </>}
        </>)
    }
    const checkTake = (rowData) => {
        return (<>
            {!rowData.take ? <div >
                <Button icon='pi pi-times-circle' onClick={(e) => handleOpenPopupOrConf("take", rowData, "Are you sure you want to approval taking this loan?", e)}></Button>
            </div> :
                <>
                    <div > <Button icon='pi pi-check-circle' onClick={(e) => handleOpenPopupOrConf("take", rowData, "Are you sure you want to cancel taking this loan?", e)}></Button></div>
                </>}
        </>)
    }
    const changeStatus = (idReq, take) => {
        if (take)
            putLoanStatus({ id: idReq })
        else
            console.log("לשנות להודעה רשמית אין אפשרות להחזיר הלוואה שלא נלקחה");
    }
    const checkApproval = (rowData) => {
        return (<>
            {!rowData.approval ? <div >
                <Button icon='pi pi-times-circle' onClick={(e) => handleOpenPopupOrConf("approval", rowData, "Are you sure you want to approval this loan?", e)}></Button>
            </div> :
                <>
                    <div > <Button icon='pi pi-check-circle' onClick={(e) => handleOpenPopupOrConf("approval", rowData, "Are you sure you want to cancel approval of this loan?", e)}></Button></div>
                </>}
        </>)
    }
    const handleCloseWeftsDialog = () => {
        setView(false)
        setDialogVisible(false)
    }
    const handleOpenDialog = (rowData) => {
        setIdLoan(rowData._id)
        setWeftsDialog(rowData.wefts)
        setView(true)
        setDialogVisible(true)
    }
    const weftsButtons = (rowData) => {
        return (<>
            <div >
                <Button icon='pi pi-chevron-down' onClick={() => handleOpenDialog(rowData)}></Button>
                {view ? <ShowWefts wefts={weftsDialog} dialogVisible={dialogVisible} idLoan={idLoan} setWeftsDialog={setWeftsDialog} setDialogVisible={handleCloseWeftsDialog} role={false}></ShowWefts> : ""}
            </div>
        </>)
    }
    const confirm = (event, text) => {
        confirmPopup({
            target: event.currentTarget,
            message: text,
            icon: 'pi pi-exclamation-triangle',
            // defaultFocus: 'accept' 

        });
    };

    const toast = useRef(null);
    const buttonEl = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const header = renderHeader();
    const icon = (<i className="pi pi-search"></i>)
    return (
        <div className="card">

            {rowDataState ?
                <OverlayPanel ref={op} >
                    {console.log(`http://localhost:1300/uploads/${(rowDataState.img).split("\\")[2]}`)}
                    <Image src={`http://localhost:1300/uploads/${(rowDataState.img).split("\\")[2]}`} indicatorIcon={icon} alt="Image" preview width="420" style={{ maxHeight: "25rem", minHeight: "25rem", maxWidth: "30rem", minWidth: "30rem" }}></Image>
                </OverlayPanel>
                : <></>}
            <OverlayPanel ref={ms}>
                <Message severity="warn" text={msText} />
            </OverlayPanel>
            <Confirmation func={allChange} id={rowDataState} nameAction={nameAction}></Confirmation>
            <DataTable value={allLoans} paginator rows={10} dataKey="_id" filters={filters} filterDisplay="row" loading={isLoading}
                globalFilterFields={['user.identity', 'user.name', 'createdAt', 'user.phone', 'user.address','updatedAt', 'approval', 'take', 'status']} header={header} emptyMessage="No loans found.">
                <Column field="createdAt" header="createdAt" bodyClassName="text-center" style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="updatedAt" header="updatedAt" bodyClassName="text-center" style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="user.identity" header="Identity" bodyClassName="text-center"  style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="user.name" header="Name" bodyClassName="text-center"  style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="user.email" header="Email" bodyClassName="text-center"  style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="user.phone" header="Phone" bodyClassName="text-center"  style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column field="request.count" header="Count" bodyClassName="text-center" style={{ minWidth: '8rem', maxWidth: '10rem' }} />
                <Column header="Show wefts" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={weftsButtons} />
                <Column header="Return approval" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '1rem' }} body={showImg} />

                <Column field="approval" header="Is approval?" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkApproval} />
                <Column field="take" header="Is Take?" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkTake} />

                <Column field="status" header="Return status" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '5rem' }} body={checkStatus} />

            </DataTable>
        </div>
    );
}