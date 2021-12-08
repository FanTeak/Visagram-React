import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import React, {useState} from 'react'
import Form from "../../layouts/Form"
import { Input, Select, Button } from "../../controls";

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
    const {values, errors, handleInputChange} = props;
    const classes = useStyles();

    return (
        <Form>
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
                    options={[
                        {id:0, title:"Select"},
                        {id:1, title:"Customer 1"},
                        {id:2, title:"Customer 2"},
                        {id:3, title:"Customer 3"},
                        {id:4, title:"Customer 4"}
                    ]}/>
                </Grid>
                <Grid item xs={6}>
                <Select 
                    label="Payment Method" 
                    name="pMethod"
                    value={values.pMethod}
                    onChange = {handleInputChange}
                    options={pMethods}/>
                    <Input 
                    label="Total" 
                    name="totalPayment" 
                    disabled 
                    value={values.totalPayment}
                    InputProps={{
                        startAdornment: <InputAdornment className={classes.adornmentText} position="start">$</InputAdornment>
                    }}
                    />
                    <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton
                                size="large"
                                type="submit">Submit</MuiButton>
                            <MuiButton
                                size="small"
                                //onClick={resetForm}
                                
                            >All</MuiButton>
                        </ButtonGroup>
                        <Button
                            size="large"
                            //onClick={openListOfOrders}
                            
                        >Details</Button>
                </Grid>
            </Grid>
        </Form>
    )
}