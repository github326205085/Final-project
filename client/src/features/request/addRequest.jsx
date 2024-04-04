import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { useAddRequestMutation, useUpdateRequestItemMutation } from "./requestsApiSlice";

export default function AddRequest({ visible, handleClose, type ,idReq}) {
  const [request, setRequest] = useState({ count: 0 });
  const [addRequest, { isError, isSuccess }] = useAddRequestMutation()
  const [putRequest, { isError1, isSuccess1 }] = useUpdateRequestItemMutation()
  const handleSave = () => {
    if (type==='Create')
    {
            addRequest(request)
    }
    else
      putRequest({id:idReq , count:request.count})
    setRequest({ count: 0 })
  }
  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        modal
        onHide={() => handleClose(false)}
        content={({ hide }) => (
          <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
            <div className="inline-flex flex-column gap-2">
              <div className="flex-auto">
                <label htmlFor="currency-us" className="font-bold block mb-2"> Loan amount  </label>
                <InputNumber inputId="currency-us" value={request.count} onValueChange={(e) => setRequest({ count: e.value })} mode="currency" currency="USD" locale="en-US" />
              </div>                        </div>

            <div className="flex align-items-center gap-2">
              <Button label="Send" onClick={(e) => { handleSave(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
              <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            </div>
          </div>
        )}
      ></Dialog>
    </div>
  )
}
