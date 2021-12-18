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

const addSalaryOffer = salaryOffer => {
    let x = {
        salaryPaymentId: values.paymentId,
        salaryDetailsId: 0,
        salaryOfferId: salaryOffer.salaryOfferId,
        quantity: 1,
        salaryOfferValue: salaryOffer.offerValue,
        offerName: salaryOffer.offerName
    }
    setValues({
        ...values,
        salaryDetails: [...values.salaryDetails, x]
    })
}

const removeSalaryOffer = (index, id) => {
    debugger;
    let x = { ...values };
    x.salaryDetails = x.salaryDetails.filter((_, i) => i != index);
    if (id != 0)
        x.deletedSalaryItemIds += id + ',';
    setValues({ ...x });
}

    return (
    <Grid container spacing={2}>
        <Grid items xs={12}>
        <   PaymentForm {...{values, errors, handleInputChange}}/>
        </Grid>
        <Grid items xs={6}>
            <SearchSalaryOffers {...{addSalaryOffer, selectedSalaryOffers:values.salaryDetails}}/>
        </Grid>
        <Grid items xs={6}>
            <SelectedSalaryOffers
            {...{selectedSalaryOffers:values.salaryDetails, removeSalaryOffer}}/>
        </Grid>
    </Grid>
    )
}