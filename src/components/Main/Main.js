import React, { useContext } from 'react'
import { Card, CardHeader, CardContent,Typography, Divider, Grid } from '@material-ui/core';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from '../../context/context';

const Main = () => {
    const classes = useStyles();

    const {balance} = useContext(ExpenseTrackerContext);
  return (
    <Card className={classes.root}>
        <CardHeader title="Expense Tracker" />
        <CardContent>
            <Typography align = "center" variant = "h5" >Total Balance ₹{balance}</Typography>
            <Typography variant = "subtitle1" style={{lineHeight:'1.5em', marginTop:'20px'}}>
                Try Saying : Add Income for ₹1000 in Category Salary for Monday...
            </Typography>
            <Divider className={classes.divider}/>
            <Form />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default Main