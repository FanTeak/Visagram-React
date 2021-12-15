import { List, ListItem, ListItemText } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { createAPIEndpoint, ENDPIONTS } from "../../api";

export default function SearchSalaryOffers(){

    const [salaryOffers, setSalaryOffers] = useState([]);
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.SALARYOFFER).fetchAll()
            .then(res => {
                setSalaryOffers(res.data);
                //setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <List>
            {
                salaryOffers.map((item, idx)=>(
                    <ListItem key={idx}>
                        <ListItemText primary={item.offerName}></ListItemText>
                    </ListItem>
                ))
            }
        </List>
    )
}