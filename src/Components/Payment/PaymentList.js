import { Tab, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {createAPIEndpoint, ENDPIONTS} from '../../api'
import Table from '../../layouts/Table'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function PaymentList(props){
    const {setPaymentId, setPaymentListVisibility, resetFormControls, setNotify} = props;
    const [paymentList, setPaymentList] = useState([]);

    useEffect(()=>{
        createAPIEndpoint(ENDPIONTS.SALARYPAYMENT).fetchAll()
            .then(res => {
                setPaymentList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setPaymentId(id);
        setPaymentListVisibility(false);
    }

    const deletePayment = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            createAPIEndpoint(ENDPIONTS.SALARYPAYMENT).delete(id)
                .then(res => {
                    setPaymentListVisibility(false);
                    setPaymentId(0);
                    resetFormControls();
                    setNotify({ isOpen: true, message: 'Deleted successfully.' });
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Payment No.</TableCell>
                    <TableCell>Staff</TableCell>
                    <TableCell>Payed With</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    paymentList.map(item=>(
                        <TableRow key={item.paymentId}>
                            <TableCell onClick={e => showForUpdate(item.paymentId)}>
                                {item.paymentNumber}
                            </TableCell>
                            <TableCell onClick={e => showForUpdate(item.paymentId)}>
                                {item.staff.staffName + " " + item.staff.staffSurname}
                            </TableCell>
                            <TableCell onClick={e => showForUpdate(item.paymentId)}>
                                {item.paymentType}
                            </TableCell>
                            <TableCell onClick={e => showForUpdate(item.paymentId)}>
                                {item.total}
                            </TableCell>
                            <TableCell>
                                <DeleteSweepIcon 
                                color='secondary'
                                onClick={e => deletePayment(item.paymentId)}/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}