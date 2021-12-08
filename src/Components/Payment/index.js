import React from 'react'
import PaymentForm from './PaymentForm'
import { useForm } from '../../hooks/useForm';

const generateSalaryNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

//different
const getFreshModelObject = () => ({
    paymentId: 0,
    paymentNumber: generateSalaryNumber(),
    staffId: 0,
    paymentType: 'none',
    total: 0,
    deletedSalaryDetailsIds:'',
    orderDetails: []
})

export default function Payment(){
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }=useForm(getFreshModelObject);

    return (
    <PaymentForm
    {...{values, errors, handleInputChange}}
    />
    )
}