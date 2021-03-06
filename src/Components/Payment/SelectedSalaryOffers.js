import { List, Paper, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ButtonGroup, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { roundTo2DecimalPoint } from '../../utils'
import { fontStyle } from '@mui/system';

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))

export default function SelectedSalaryOffers(props){
    console.log(props);
    const{values, setValues} = props;
    const classes = useStyles();

    let selectedSalaryOffers = values.orderDetails;

    const updateQuantity = (idx, value) => {
        let x = { ...values };
        let salaryOffer = x.orderDetails[idx];
        if (salaryOffer.quantity + value > 0) {
            salaryOffer.quantity += value;
            setValues({ ...x });
        }
    }

    const removeSalaryOffer = (index, id) => {
        debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        if (id != 0)
            x.deletedSalaryItemIds += id + ',';
        setValues({ ...x });
    }

    return (
        <List>
            {
                selectedSalaryOffers.length  == 0 ?
                <ListItem>
                    <ListItemText 
                    primary="Please select salary offer"
                    primaryTypographyProps={{
                        style:{
                            textAlign: 'center',
                            fontStyle: 'italic'
                        }
                    }}/>
                </ListItem> : 
                selectedSalaryOffers.map((item, idx)=>(
                    <Paper key={idx} className={classes.paperRoot}>
                        <ListItem>
                            <ListItemText
                                primary={item.offerName}
                                primaryTypographyProps={{
                                    component: 'h1',
                                    style: {
                                        fontWeight: '500',
                                        fontSize: '1.2em'
                                    }
                                }}
                                secondary={
                                    <>
                                        <ButtonGroup
                                            className={classes.buttonGroup}
                                            size="small">
                                            <Button
                                                onClick={e => updateQuantity(idx, -1)}
                                            >-</Button>
                                            <Button
                                                disabled
                                            >{item.quantity}</Button>
                                            <Button
                                                onClick={e => updateQuantity(idx, 1)}
                                            >+</Button>
                                        </ButtonGroup>
                                        <span className={classes.totalPerItem}>
                                            {'$' + roundTo2DecimalPoint(item.quantity * item.salaryOfferValue)}
                                        </span>
                                    </>
                                }
                                secondaryTypographyProps={{
                                    component: 'div'
                                }}
                            />
                            <ListItemSecondaryAction
                                className={classes.deleteButton}
                                >
                                <IconButton
                                    disableRipple
                                    onClick={e => removeSalaryOffer(idx, item.salaryDetailsId)}
                                >
                                    <DeleteSweepIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                </Paper>
                ))
            }
        </List>
    )
}