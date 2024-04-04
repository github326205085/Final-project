import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { useRegisterMutation } from '../auth/authApiSlice'
import { useAddLoanMutation } from "./loanApiSlice";
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import {useGetLoansByUserIdQuery} from '../loan/loanApiSlice'
import './promissoryNote.css'
export default function PromissoryNote({ visibleLoan, handleCloseLoan ,idLoan}) {
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
    const [addLoan, { isErrorLoan, isSuccessLoan }] = useAddLoanMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess])

    // useEffect(() => {
    //     setVisible(visibleReg)
    // }, [visibleReg])

    const defaultValues = {
            sign: '',
            returnDate: '',
            nameWeft1: '',
            emailWeft1: '',
            phoneWeft1: '',
            signWeft1: '',
            nameWeft2: '',
            emailWeft2: '',
            phoneWeft2: '',
            signWeft2: '',
        };
    
    

    const {
        control,
        formState: { errors },
        reset,
        register,
        handleSubmit,
        watch,
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        const loan = {
            sign: data.sign,
            returnDate: data.returnDate,
            wefts: [{ name: data.nameWeft1, sign: data.signWeft1, email: data.emailWeft1, phone: data.phoneWeft1 },
            { name: data.nameWeft2, sign: data.signWeft2, email: data.emailWeft2, phone: data.phoneWeft2 }],
            request:idLoan
        }
        addLoan(loan)
        handleCloseLoan(false)
    };

    console.log(watch("example"));
    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    // Inline CSS for the layout
    const formContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        // gridTemplateColumns: 'repeat(3, 1fr)', // Creates three columns of equal width
        gap: '20px',// Adjust the gap between columns as needed
        '@media (min-width: 800px)': {
            gridTemplateColumns: 'repeat(3, 1fr)', // Creates three columns of equal width for screens wider than 768px
        },
        '@media (max-width: 1000)': {
            gridTemplateColumns: '1fr', // Stacks inputs vertically on screens smaller than 768px
        },
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
    };
    const dialogContentStyle = {
        maxHeight: '400px', // Adjust this value as needed
        overflowY: 'auto', // Enable vertical scrolling
    };
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visibleLoan}
                modal
                onHide={() => handleCloseLoan(false)}
                style={{ width: '35vw', minWidth: '35vw'}} // Adjust dialog width as needed
                contentStyle={{ maxHeight: 'calc(150 - 200px)', overflowY: 'auto' }} // Makes content scrollable
                >
                    <div className="flex flex-column px-8 py-5 gap-4" contentStyle={dialogContentStyle} style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))', textAlign: 'center'}}>

                        <Button label="Promissory Note" icon="pi pi-book" />

                        <div className="inline-flex flex-column gap-2">
                            <div className="card flex justify-content-center">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div style={formContainerStyle}>
                                        <div style={columnStyle}>
                                            <label style={{ marginBottom: '1em' }}>Weft number one:</label>
                                            <Controller
                                                name="nameWeft1"
                                                control={control}
                                                rules={{ required: 'Name is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("nameWeft1", {

                                                                        maxLength: 30,
                                                                        pattern: /^[A-Za-z]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Name</label>
                                                                {errors?.nameWeft1?.type === "maxLength" && (
                                                                    <p> Name cannot exceed 30 characters</p>)}
                                                                {errors?.nameWeft1?.type === "pattern" && (
                                                                    <p>Alphabetical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="emailWeft1"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("emailWeft1", {
                                                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                                {errors?.emailWeft1?.type === "pattern" && (
                                                            <p> Please enter a valid email address </p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="phoneWeft1"
                                                control={control}
                                                rules={{ required: 'Phone is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>

                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("phoneWeft1", {
                                                                        maxLength: 10,
                                                                        minLength: 10,
                                                                        pattern: /^[0-9]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Phone</label>
                                                                {errors?.phoneWeft1?.type === "maxLength" && (
                                                                    <p>phone cannot exceed 10 characters</p>)}
                                                                {errors?.phoneWeft1?.type === "minLength" && (
                                                                    <p>phone cannot less than 10 characters</p>)}
                                                                {errors?.phoneWeft1?.type === "pattern" && (
                                                                    <p>Namerical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="signWeft1"
                                                control={control}
                                                rules={{ required: 'Sign is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("signWeft1", {

                                                                        maxLength: 30,
                                                                        pattern: /^[A-Za-z]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Sign</label>
                                                                {errors?.signWeft1?.type === "maxLength" && (
                                                                    <p> Name cannot exceed 30 characters</p>)}
                                                                {errors?.signWeft1?.type === "pattern" && (
                                                                    <p>Alphabetical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div style={columnStyle}>
                                            <label style={{ marginBottom: '1em' }}>Weft number two:</label>
                                            <Controller
                                                name="nameWeft2"
                                                control={control}
                                                rules={{ required: 'Name is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("nameWeft2", {

                                                                        maxLength: 30,
                                                                        pattern: /^[A-Za-z]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Name</label>
                                                                {errors?.nameWeft2?.type === "maxLength" && (
                                                                    <p> Name cannot exceed 30 characters</p>)}
                                                                {errors?.nameWeft2?.type === "pattern" && (
                                                                    <p>Alphabetical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="emailWeft2"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("emailWeft2", {
                                                                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    })}/>
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                                {errors?.emailWeft2?.type === "pattern" && (<p> Please enter a valid email address </p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="phoneWeft2"
                                                control={control}
                                                rules={{ required: 'Phone is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>

                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("phoneWeft2", {
                                                                        maxLength: 10,
                                                                        minLength: 10,
                                                                        pattern: /^[0-9]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Phone</label>
                                                                {errors?.phoneWeft2?.type === "maxLength" && (
                                                                    <p>phone cannot exceed 10 characters</p>)}
                                                                {errors?.phoneWeft2?.type === "minLength" && (
                                                                    <p>phone cannot less than 10 characters</p>)}
                                                                {errors?.phoneWeft2?.type === "pattern" && (
                                                                    <p>Namerical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            <Controller
                                                name="signWeft2"
                                                control={control}
                                                rules={{ required: 'Sign is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("signWeft2", {

                                                                        maxLength: 30,
                                                                        pattern: /^[A-Za-z]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Sign</label>
                                                                {errors?.signWeft2?.type === "maxLength" && (
                                                                    <p> Name cannot exceed 30 characters</p>)}
                                                                {errors?.signWeft2?.type === "pattern" && (
                                                                    <p>Alphabetical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div style={columnStyle}>
                                        <label style={{ marginBottom: '1em' }}>Add return date and sign:</label>

                                            <Controller
                                                name="returnDate"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                           
                                                            <Calendar value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                onChange={(e) => field.onChange(e.target.value)} dateFormat="dd/mm/yy"/>
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                            
                                            <Controller
                                                name="sign"
                                                control={control}
                                                rules={{ required: 'Sign is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                    {...register("sign", {

                                                                        maxLength: 30,
                                                                        pattern: /^[A-Za-z]+$/i,
                                                                    })} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Sign</label>
                                                                {errors?.sign?.type === "maxLength" && (
                                                                    <p> Name cannot exceed 30 characters</p>)}
                                                                {errors?.sign?.type === "pattern" && (
                                                                    <p>Alphabetical characters only</p>)}
                                                            </span>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Button label="Save" type="submit" style={{ marginRight: '1em', marginTop: '2em' }} />
                                        <Button label="Cancel" type="submit" onClick={(e) => { handleCloseLoan(false) }}  ></Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
            
            </Dialog >
        </div >
    )
}