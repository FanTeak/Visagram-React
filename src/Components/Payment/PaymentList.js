import { Tab, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {createAPIEndpoint, ENDPIONTS} from '../../api'
import Table from '../../layouts/Table'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function PaymentList(){
    const [paymentList, setPaymentList] = useState([]);

    useEffect(()=>{
        createAPIEndpoint(ENDPIONTS.SALARYPAYMENT).fetchAll()
            .then(res => {
                setPaymentList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

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
                            <TableCell>
                                {item.paymentNumber}
                            </TableCell>
                            <TableCell>
                                {item.staff.staffName + " " + item.staff.staffSurname}
                            </TableCell>
                            <TableCell>
                                {item.paymentType}
                            </TableCell>
                            <TableCell>
                                {item.total}
                            </TableCell>
                            <TableCell>
                                <DeleteSweepIcon color='secondary'/>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}