import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { CustomerService } from '../../service/CustomerService';
import { useGetLoansByUserIdQuery, useUpdateLoanWeftsMutation } from './loanApiSlice'
import 'react-phone-number-input/style.css';

export default function ShowWefts({ setRowD, wefts, idLoan, dialogVisible, setDialogVisible, refetch, role }) {
    const [customers, setCustomers] = useState([]);
    const [valuePhone, setValuePhone] = useState();
    const [phoneValidationMessage, setPhoneValidationMessage] = useState('');


    const [loadId, setLoanId] = useState("");
    const { data: allLoans, isSuccess, isLoading, isError, error } = useGetLoansByUserIdQuery()
    // useEffect(() => {
    //     CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    // }, [dialogVisible]);
    useEffect(() => {
        if (valuePhone && validateLocalPhoneNumber(valuePhone.toString())) {
            console.log("Phone Number Valid");
          } else {
            console.log("Invalid");
        }
    }, [valuePhone]);

    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => { setDialogVisible() }} />;
    };
    const [products, setProducts] = useState(null);
    const [statuses] = useState(['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK']);
    const [putLoanWefts, { isErrorTake, isSuccessTake }] = useUpdateLoanWeftsMutation()

    const validateLocalPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) {
            // Phone number is required
            return false;
        }
        // Example pattern: Adjust the regex to match your country's phone number format
        const pattern = /^\d{10}$/;
        return pattern.test(phoneNumber);
    }
    const onRowEditComplete = (e) => {
        let { newData, index } = e;
        const phone = newData.phone ? newData.phone.toString() : "";
        const isPhoneValid = validateLocalPhoneNumber(phone);
    
        if (!isPhoneValid ) {
            
            setPhoneValidationMessage('Phone number is required and must be valid.');
            return;
        }
        else if(!phone){
            setPhoneValidationMessage('Invalid phone number. Please correct it before saving.');  
              return; 
        }else{
            setPhoneValidationMessage(''); 
            let _wefts = [...wefts];

            const weft = {
                id: idLoan,
                numWeft: e.index,
                name: e.newData.name,
                email: e.newData.email,
                phone: e.newData.phone,
                sign: e.newData.sign
                // updatedAt:new Date()
            };
            _wefts[index] = weft
            setRowD(_wefts)
            // debugger
            // setRowD(weft)
            putLoanWefts(weft)// Clear the message on successful validation
        }       
    };

    const phoneEditor = (options) => {
        return (
            <InputText
                value={options.value}
                onChange={(e) => {
                    const value = e.target.value;
                    options.editorCallback(value); // Update the value in the DataTable
                    if (validateLocalPhoneNumber(value)) {
                        setPhoneValidationMessage('');
                    } else if(value===""){
                        setPhoneValidationMessage('Phone number is required and must be valid.');
                    }
                    else {
                        setPhoneValidationMessage('Invalid phone number. Please correct it.');
                    }
                }}
            />
        );
        //     return (
        //     <PhoneInput
        //         defaultCountry="israel"
        //         value={options.value}
        //         onChange={(value) => {
        //             options.editorCallback(value);
        //         }}
        //         style={{border: isValid ? "1px solid green" : "1px solid red"}}
        //         error={options.value ? (isValidPhoneNumber(options.value) ? undefined : 'Invalid phone number') : 'Phone number required'}
        //     />
        // );
    };

    const textEditor = (options) => {
        return (
            <>
        <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
         </>
        )
    };

    return (
        <div className="card">
            <Dialog header="WEFTS" visible={dialogVisible} style={{ width: '75vw' }} maximizable
modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
{phoneValidationMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{phoneValidationMessage}</div>}                <DataTable value={wefts} editMode="row" dataKey="_id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="sign" header="sign" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="phone" header="Phone" editor={(options) => phoneEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="updatedAt" header="UpdatedAt" style={{ width: '20%' }}></Column>
                    {role ? <Column rowEditor={true} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> : null}
                </DataTable>
            </Dialog>
        </div>
    );
}