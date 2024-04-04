import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import userAuth from '../auth/userAuth'
import { useUpdateUserItemMutation, useDeleteUserItemMutation } from '../user/userApiSlice'
import { confirmDialog } from 'primereact/confirmdialog';
import Confirmation from '../../Components/confirmation';
// import Login from './Login';
export default function PrivateArea({ visibleReg, setRegister, handleOpenLogin, role }) {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const { _id, identity, name: n, address, email, phone, role: r, active: act } = userAuth()
    const [updateUser, { isError: isErrorUser, isSuccess: isSuccessUser, isLoading: isLoadinguser, data: dataUser, error: erroUserr }] = useUpdateUserItemMutation()
    console.log({ _id, identity, n, address, email, phone, r });
    const [idUser, setIdUser] = useState(null)
    const [delUserFunc] = useDeleteUserItemMutation()
    const defaultValues = {
        name: '',
        password: '',
        identity: '',
        email: '',
        phone: '',
        address: '',
        role: role
    };
    const handleDeleteUser = async (idus) => {
        // console.log(idL);
      //  setIdUser(idus)
        // console.log(idus + " 00000");
        await delUserFunc({ id: idus })
        navigate("/")
        setIdUser(null)
    }

    const handleViewCon = (rowData, text) => {
        confirmDialog({
            group: 'headless',
            mahmut: 'mahmut',
            message: text,
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
        });
        console.log(rowData);
        setIdUser(rowData);

    }
    const {
        control,
        formState: { errors },
        reset,
        register,
        handleSubmit,
        watch,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        updateUser(data)
    };
    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
            <Confirmation func={handleDeleteUser} id={idUser}></Confirmation>
            <div className="card">
                <Card title="Update user">
                    <div className="card flex justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        {/* <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label> */}
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} text={n} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    {...register("name", {

                                                        maxLength: 30,
                                                        pattern: /^[A-Za-z]+$/i,
                                                    })} />
                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Name</label>
                                                {errors?.name?.type === "maxLength" && (
                                                    <p> Name cannot exceed 30 characters</p>)}
                                                {errors?.name?.type === "pattern" && (
                                                    <p>Alphabetical characters only</p>)}
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="identity"
                                control={control}
                                rules={{ required: 'Identity is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={identity} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    {...register("identity", {
                                                        maxLength: 9,
                                                        minLength: 9,
                                                        pattern: /^[0-9]+$/i,
                                                    })} />
                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Identity</label>
                                                {errors?.identity?.type === "maxLength" && (
                                                    <p>Identity cannot exceed 9 characters</p>)}
                                                {errors?.identity?.type === "minLength" && (
                                                    <p>Identity cannot less than 9 characters</p>)}
                                                {errors?.identity?.type === "pattern" && (
                                                    <p>Namerical characters only</p>)}
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Phone is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>

                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={phone} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    {...register("phone", {
                                                        maxLength: 10,
                                                        minLength: 10,
                                                        pattern: /^[0-9]+$/i,
                                                    })} />
                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Phone</label>
                                                {errors?.phone?.type === "maxLength" && (
                                                    <p>phone cannot exceed 10 characters</p>)}
                                                {errors?.phone?.type === "minLength" && (
                                                    <p>phone cannot less than 10 characters</p>)}
                                                {errors?.phone?.type === "pattern" && (
                                                    <p>Namerical characters only</p>)}
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: 'Address is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>

                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={address} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)} />
                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Address</label>
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <InputText id={field.name} value={field.value} placeholder={email} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    aria-invalid={errors.mail ? "true" : "false"} />
                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                {errors.mail && <p role="alert">{errors.mail.message}</p>}
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <div style={{ marginTop: '1em' }}>
                                            <span className="p-float-label">
                                                <Password value={field.value} id={field.name} className={classNames({ 'p-invalid': fieldState.error })}
                                                    onChange={(e) => field.onChange(e.target.value)} toggleMask />
                                                <label htmlFor={field.name}>Password</label>
                                            </span>
                                        </div>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <div>

                                <Button label="Update" type="submit" style={{ marginRight: '1em', marginTop: '2em' }} />

                            </div>
                        </form>
                    </div>
                   {console.log(act)} 
                    {!act ?
                        <Button label="Delete register" type="submit" onClick={() => { handleViewCon(_id, "Are you sure you want to delete this user?") }}></Button>
                        : <></>}
                </Card>
            </div></>
    )
}