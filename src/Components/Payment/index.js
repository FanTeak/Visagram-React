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
    <Grid container>
        <Grid items xs={12}>
        <   PaymentForm {...{values, errors, handleInputChange}}/>
        </Grid>
        <Grid items xs={6}>
            <SearchSalaryOffers></SearchSalaryOffers>
        </Grid>
        <Grid items xs={6}>
            <SelectedSalaryOffers></SelectedSalaryOffers>
        </Grid>
    </Grid>
    )
}