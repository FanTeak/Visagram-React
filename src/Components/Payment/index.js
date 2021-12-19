import React from 'react'
import PaymentForm from './PaymentForm'
import { useForm } from '../../hooks/useForm';
import SearchSalaryOffers from './SearchSalaryOffers';
import { Grid } from '@material-ui/core';
import SelectedSalaryOffers from './SelectedSalaryOffers';

const generateSalaryNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

//different
const getFreshModelObject = () => ({
    paymentId: 0,
    paymentNumber: generateSalaryNumber(),
    staffId: 0,
    paymentType: 'none',
    total: 0,
    deletedSalaryItemIds:'',
    salaryDetails: []
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
    <Grid container spacing={2}>
        <Grid items xs={12}>
        <   PaymentForm {...{values, setValues, errors, setErrors, handleInputChange, resetFormControls}}/>
        </Grid>
        <Grid items xs={6}>
            <SearchSalaryOffers {...{values, setValues}}/>
        </Grid>
        <Grid items xs={6}>
            <SelectedSalaryOffers
            {...{values, setValues}}/>
        </Grid>
    </Grid>
    )
}