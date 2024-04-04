import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useGetUsersQuery, useDeleteUserItemMutation } from './userApiSlice';
import Register from '../auth/Register';
import userAuth from '../auth/userAuth'
import { confirmDialog } from 'primereact/confirmdialog';
import Confirmation from '../../Components/confirmation';

const {_id, identity, name:n, address, email, phone, active:act, role:r }=userAuth()

export default function ListUsers() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const { data: allUsers, isLoading, isError, error } = useGetUsersQuery()
    const [visible, setVisible] = useState(false)
    const [view, setView] = useState(false)
    // const [isActive, setIsActive] = useState(act) 
    const [rowDataState, setRowDataState] = useState(null);
    const [idUser, setIdUser] = useState(null)
    const [delUserFunc] = useDeleteUserItemMutation()


    const listItem = (user, index) => {
        return (
            <div className="col-12" key={user.identity}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-user"></i>
                                <span className="font-semibold">{user.identity}</span>
                                {!user.active?
                            <Button icon="pi pi-trash" rounded outlined aria-label="Filter" onClick={()=>{handleViewCon(user._id,"Are you sure you want to delete this user?")}}/>:
                            <> <label>  active</label></>}
                            </div>
                            <div className="flex align-items-center gap-2">
                                <span className="font-semibold">{user.role}</span>
                            </div>
                            <div className="text-3xl font-bold text-900">{user.name}</div>
                            <div className="text-0.5xl font-bold">{user.address}</div>

                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold"> {user.phone} <i className="pi pi-phone"></i></span>
                            <span className="text-1.5xl font-semibold"> {user.email} <i className="pi pi-envelope"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const handleDeleteUser = async (idus) => {
        // console.log(idL);
      //  setIdUser(idus)
        // console.log(idus + " 00000");
        await delUserFunc({ id: idus })
        setIdUser(null)
    }

    const handleViewCon = (rowData, text) => {
        
        setRowDataState(rowData);
        // console.log(rowData);
        // console.log(rowData);
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: text,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            // accept,
            // reject
        });
        console.log(rowData);
        setIdUser(rowData);

    }
const deleteUser=(idUser)=>{
    handleViewCon(idUser,"Are you sure you want to delete this request?")
}
    const gridItem = (user) => {
        return (
            <>
            <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2" key={user.identity}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2" >
                            <i className="pi pi-user"></i>
                            <span className="font-semibold">{user.identity}</span>
                            
                            {!user.active?
                            <Button icon="pi pi-trash" rounded outlined aria-label="Filter" onClick={()=>{handleViewCon(user._id,"Are you sure you want to delete this user?")}}/>:
                            <> <label>  active</label></>}
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{user.role}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <div className="text-2xl font-bold">{user.name}</div>
                        <div className="text-0.5xl font-bold">{user.address}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-1xl font-semibold"><i className="pi pi-envelope"></i>  {user.email}</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold"><i className="pi pi-phone"></i>  {user.phone} </span>
                    </div>
                </div>
            </div></>
        );
    };

    const itemTemplate = (user, layout, index) => {
        if (!user) {
            return;
        }

        if (layout === 'list') return listItem(user, index);
        else if (layout === 'grid') return gridItem(user);
    };

    const listTemplate = (allUsers, layout) => {
        return <div className="grid grid-nogutter">{allUsers.map((user, index) => itemTemplate(user, layout, index))}</div>;
    };
    const handleClose = () => {
        setView(false)
        setVisible(false)
    }
    const handleAddEdmit = () => {
        // handleClickOpen()
        setVisible(true)
        setView(true)
    }

    const header = () => {
        return (
            <>
                <DataViewLayoutOptions className="flex justify-content-end" layout={layout} onChange={(e) => setLayout(e.value)} />
                <Button className="flex justify-content-start" type="button" label="ADD EDMIT" onClick={() => handleAddEdmit()} />
                {/* {console.log(visible)} */}
                {setView ? <><Register
                    visibleReg={visible}
                    setRegister={handleClose}
                    type={"Create"}
                    role='edmit'></Register></> : <></>}
            </>
        );
    };


    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    return (
        <div className="card">
            <DataView value={allUsers} listTemplate={listTemplate} layout={layout} header={header()} />
          <Confirmation func={handleDeleteUser} id={idUser}></Confirmation>
        </div>
    )
}