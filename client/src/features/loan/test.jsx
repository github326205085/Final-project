import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { useRegisterMutation } from '../auth/authApiSlice'
import { Password } from 'primereact/password';
export default function Test({ visibleReg, setRegister }) {
    const [visible, setVisible] = useState(true);
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()
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
        name: '',
        password: '',
        identity: '',
        email: '',
        phone: '',
        address: '',
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
        console.log(data);
        registerFunc(data)
        reset();
    };

    console.log(watch("example"));
    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    // Inline CSS for the layout
    const formContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Creates three columns of equal width
        gap: '20px', // Adjust the gap between columns as needed
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
            {console.log(visible)}
            <Dialog
                visible={visible}
                modal
                onHide={() => setRegister(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" contentStyle={dialogContentStyle} style={{ borderRadius: '12px', width: '50vw', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))', textAlign: 'center' }}>

                        <Button label="Register" icon="pi pi-user-plus" />

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
                                                                    aria-invalid={errors.mail ? "true" : "false"} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                                {errors.emailWeft1 && <p role="alert">{errors.emailWeft1.message}</p>}
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
                                                                    aria-invalid={errors.mail ? "true" : "false"} />
                                                                <label htmlFor={field.name} style={{ marginLeft: '1em' }}>Email</label>
                                                                {errors.emailWeft2 && <p role="alert">{errors.emailWeft2.message}</p>}
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
                                                name="email"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                        <div style={{ marginTop: '1em' }}>
                                                            <span className="p-float-label">
                                                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
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
                                        <Button label="Sign-Up" type="submit" style={{ marginRight: '1em', marginTop: '2em' }} />
                                        <Button label="Cancel" type="submit" onClick={(e) => { hide(e) }}  ></Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                )}
            ></Dialog >
        </div >
    )
}