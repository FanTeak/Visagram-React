import { List, Paper, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import React from 'react';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function SelectedSalaryOffers(props){
    const{selectedSalaryOffers, removeSalaryOffer} = props;
    return (
        <List>
            {
                selectedSalaryOffers.map((item, idx)=>(
                    <Paper key={idx}>
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
                            />
                            <ListItemSecondaryAction
                                //</ListItem>className={classes.deleteButton}
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