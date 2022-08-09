import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    // useReducer is hook which is an alternative to useState (advanced v of useState) to manage complex state logic which takes in initialState and reducer (reducer => a function that takes in old state and action(action specifies how do we want to change the state ) and => return new state)
    //transactions is our main state which holds all the actual transactions
    const [transactions, dispatch] = useReducer(contextReducer, initialState);
    // console.log(transactions);

    //action creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc,currVal) => currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount,0);

    return(
    <ExpenseTrackerContext.Provider value = {{deleteTransaction, addTransaction,transactions, balance}}>
        {children}
    </ExpenseTrackerContext.Provider>
    );
}