import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Form from "../../layouts/Form"
import { Input, Select, Button } from "../../controls";
import {createAPIEndpoint, ENDPIONTS} from "../../api";
import PaidIcon from '@mui/icons-material/Paid';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import TocIcon from '@mui/icons-material/Toc';
import { roundTo2DecimalPoint } from '../../utils'

const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'Cash', title: 'Cash' },
    { id: 'Card', title: 'Card' },
]

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#35cf1d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function PaymentForm(props){
    const {values, setValues, errors, setErrors, handleInputChange} = props;
    const classes = useStyles();
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STAFF).fetchAll()
            .then(res => {
                let staffList = res.data.map(item => ({
                    id: item.staffId,
                    title: item.staffName + " " + item.staffSurname + " " + item.phone
                }));
                staffList = [{ id: 0, title: 'Select' }].concat(staffList);
                setStaffList(staffList);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let gTotal = values.salaryDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.salaryOfferValue);
        }, 0);
        setValues({
            ...values,
            total: roundTo2DecimalPoint(gTotal)
        })

    }, [JSON.stringify(values.salaryDetails)]);

    const validateForm = () => {
        let temp = {};
        temp.staffId = values.staffId != 0 ? "" : "This field is required.";
        temp.paymentType = values.paymentType != "none" ? "" : "This field is required.";
        temp.orderDetails = values.salaryDetails.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const submitPayment = e => {
        e.preventDefault();
        if (validateForm()) {
            /*if (values.orderMasterId == 0) {
                createAPIEndpoint(ENDPIONTS.ORDER).create(values)
                    .then(res => {
                        resetFormControls();
                        setNotify({isOpen:true, message:'New order is created.'});
                    })
                    .catch(err => console.log(err));
            }
            else {
                createAPIEndpoint(ENDPIONTS.ORDER).update(values.orderMasterId, values)
                    .then(res => {
                        setOrderId(0);
                        setNotify({isOpen:true, message:'The order is updated.'});
                    })
                    .catch(err => console.log(err));
            }*/
        }

    }

    return (
        <Form onSubmit={submitPayment}>
            <Grid container>
                <Grid item xs={6}>
                    <Input 
                    label="Payment Number" 
                    name="paymentNumber" 
                    disabled 
                    value={values.paymentNumber}
                    InputProps={{
                        startAdornment: <InputAdornment className={classes.adornmentText} position="start">#</InputAdornment>
                    }}
                    />
                    <Select 
                    label="staff" 
                    name="staffId" 
                    value={values.staffId}
                    onChange = {handleInputChange}
                    options={staffList}
                    error={errors.staffId}/>
                </Grid>
                <Grid item xs={6}>
                <Select 
                    label="Payment Method" 
                    name="paymentType"
                    value={values.paymentType}
                    onChange = {handleInputChange}
                    options={pMethods}
                    error={errors.paymentType}/>
                    <Input 
                    label="Total" 
                    name="total" 
                    disabled 
                    value={values.total}
                    InputProps={{
                        startAdornment: <InputAdornment className={classes.adornmentText} position="start">$</InputAdornment>
                    }}
                    />
                    <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                endIcon={<PaidIcon/>}
                                type="submit">Submit
                            </MuiButton>
                            <MuiButton
                                size="small"
                                startIcon={<ReplayCircleFilledIcon/>}
                                //onClick={resetForm}
                            >
                            </MuiButton>
                        </ButtonGroup>
                        <Button
                            size="large"
                            startIcon={<TocIcon/>}
                            //onClick={openListOfOrders}
                        ></Button>
                </Grid>
            </Grid>
        </Form>
    )
}