import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles';
import {v4 as uuidv4 } from 'uuid';
import { ExpenseTrackerContext } from '../../../context/context';
import { useContext } from 'react';
import { incomeCategories, expenseCategories } from '../../../categories/categories';
import formatDate from '../../../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';
import { useEffect } from 'react';

const initialState = {
    amount : '',
    category : '',
    type : 'Income',        //set it intially to income to render categories
    date: formatDate(new Date()),
}

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const {addTransaction} = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();       //to generate transcript/text of what is being spoken on voice

  const createTransaction = () => {
        //created a transaction taking dataa from userInput form // typecasted amount to Number(int) // generated a unique id
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()};      
        //called the addTransaction passing the 'transaction' object to it // addTransaction initiates the action which updates the state in useContext
        addTransaction(transaction);
        setFormData(initialState);          //reset the formData state back to empty
  }
  
  //render categories based on type(income or expense)
  const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;
  
  //useEffect to change form data and createTransaction() whenever the speech(i.e segment) changes
  useEffect(() => {
    //if segment exists then....
    if(segment) {
        if(segment.intent.intent === 'add_expense') {       //if spoken words == 'add_expense'(i.e check intents in speechly config) ...then update formData to 'Expense'
            setFormData({...formData, type: 'Expense'});
        }
        else if (segment.intent.intent === 'add_income') {       //if spoken words == 'add_income'(i.e check intents in speechly config) ...then update formData to 'Income'
            setFormData({...formData, type: 'Income'});
        }
        else if (segment.isFinal && segment.intent.intent === 'create_transaction') {   	//if segment is final(i.e speech is over), and spoken_word matches create_transaction(i.e intent),then call createTransaction()
            return createTransaction();
        } 
        else if (segment.isFinal === 'cancel_transaction') {        //if segment is final(i.e speech is over), and spoken_word matches cancel_transaction(i.e intent), then empty the formData
            return setFormData(initialState);
        }
        
        //iterate entitites(check enitities in speechly config) and for each enitity...call a switch stat.
        segment.entities.forEach((entity) => {          
            const category = `${entity.value.charAt(0)}${entity.value.slice(1).toLowerCase()}`;         //in category, we have first letter as UpperCase, and all other letters and lowercase // so we create category acc. to dat format // so for every category(i.e enitity.value), keep first letter(ie charAt(0)) uppercase(by default) and && convert all other letter(i.e. slice(1)) toLowerCase
            //if entity is amount then, set formData's amount to entity.value(i.e spoken amnt)
            switch (entity.type) {
                case 'amount':
                    setFormData({...formData, amount: entity.value});
                    break;
                //if entity is category then map all categories and for each ic.type(i.e category type) check if category(i.e spoken word) is there(included) in our categories.js // if there/exists , then update formData's category to category(i.e spoken word)
                case 'category':
                    if(incomeCategories.map((ic) => ic.type).includes(category)) {
                        setFormData({...formData, type : 'Income', category : category});
                    }
                    else if(expenseCategories.map((ec) => ec.type).includes(category)) {
                        setFormData({...formData, type : 'Expense', category : category});
                    }
                    break;
                //if entity is date then update formData to entity.value(i.e spoken date)
                case 'date':
                    setFormData({...formData, date: entity.value});
                    break;
                default:
                    break;
            }
        });
        //if all the formData exists and speaking is over then call createTransaction();
        if(segment.isFinal && formData.amount && formData.date && formData.category && formData.type) {
            createTransaction();
        }
    }
  }, [segment])
  

//   console.log(formData);
  return (

    <Grid container spacing={2} >
        <Grid item xs={12} >
            <Typography align="center" variant="subtitle2" gutterBottom>
                {/* speechly => if segment(i.e our spoken words) exists then map the words and display it */}
                {segment && segment.words.map((word) => word.value).join(" ")}
            </Typography>
        </Grid>
        <Grid item xs={6} > 
            <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
                <Select value = {formData.type} onChange={(e) => setFormData({...formData ,type: e.target.value})}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} >
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value = {formData.category} onChange={(e) => setFormData({...formData ,category: e.target.value})}>
                    {selectedCategories.map((category) => <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6} > 
            <TextField type="number" label="Amount" fullWidth value = {formData.amount} onChange={(e) => setFormData({...formData ,amount: e.target.value})}/>
        </Grid>
        <Grid item xs={6} > 
            <TextField type="date" label="Date" fullWidth value = {formData.date} onChange={(e) => setFormData({...formData ,date: formatDate(e.target.value)})}/>
        </Grid>
        <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
    
  )
}

export default Form