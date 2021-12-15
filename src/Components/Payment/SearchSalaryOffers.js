import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


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
        <>
            <Paper>
                <InputBase placeholder="Search salary offers"/>
                <IconButton>
                    <ManageSearchIcon/>
                </IconButton>
            </Paper>
            <List>
                {
                    salaryOffers.map((item, idx)=>(
                        <ListItem key={idx}>
                            <ListItemText 
                                primary={item.offerName}
                                secondary={'$' + item.offerValue}>
                            </ListItemText>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}