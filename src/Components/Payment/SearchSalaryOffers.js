import { List, ListItem, ListItemText, Paper, InputBase, IconButton, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function SearchSalaryOffers(props){
    const {values, setValues} = props;
    const [salaryOffers, setSalaryOffers] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    let selectedSalaryOffers = values.orderDetails;
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.SALARYOFFER).fetchAll()
            .then(res => {
                setSalaryOffers(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        let x = [...salaryOffers];
        x = x.filter(y => {
            return y.offerName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && selectedSalaryOffers.every(item => item.salaryOfferId != y.salaryOfferId)
        });
        setSearchList(x);
    }, [searchKey, selectedSalaryOffers])

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
            orderDetails: [...values.orderDetails, x]
        })
    }

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase 
                    className={classes.searchInput} 
                    placeholder="Search salary offers"
                    value={searchKey}
                    onChange={e=>setSearchKey(e.target.value)}/>
                <IconButton>
                    <ManageSearchIcon/>
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx)=>(
                        <ListItem 
                        key={idx}
                        onClick={e=>addSalaryOffer(item)}>
                            <ListItemText 
                                primary={item.offerName}
                                secondary={'₴' + item.offerValue}>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={e=>addSalaryOffer(item)}>
                                    <PlusOneIcon/>
                                    <ArrowForwardIosIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}