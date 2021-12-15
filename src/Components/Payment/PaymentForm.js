import { Grid, InputAdornment, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Form from "../../layouts/Form"
import { Input, Select, Button } from "../../controls";
import {createAPIEndpoint, ENDPIONTS} from "../../api";
import PaidIcon from '@mui/icons-material/Paid';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import TocIcon from '@mui/icons-material/Toc';

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
                    options={staffList}/>
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