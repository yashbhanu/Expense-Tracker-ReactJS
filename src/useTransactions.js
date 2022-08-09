import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';
import { incomeCategories, expenseCategories, resetCategories } from './categories/categories';

//hook to generate data for rendering charts
const useTransactions = (title) => {
    resetCategories();      //reset amount to 0
    const { transactions } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t) => t.type === title);       //iterate over all transactions and filter out and fetch transactions only of 'Income' or 'Expense' based on the title(i.e 'Income' or 'Expense') paased in args
    let total = transactionsPerType.reduce((a,b) => a += b.amount,0);              //finds total of all transactions('Income' or 'Expense') // 0 shall be initial value
    const categories = title === 'Income' ? incomeCategories : expenseCategories;   // fetch all categories(array of objs) i.e 'Income' or 'Expense' based on title passed in args

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category);     //iteratee over each transaction('Income' or 'Expense') and for every transaction ... iterate over all categories and find and keep those categories(i.e c.type) which are equal to transaction's category(t.category) // buisness,investments,extra income

        if(category) category.amount += t.amount;           //if category exists then add amount of each transaction to category's amount
    });

    const filteredCategories = categories.filter((fc) => fc.amount > 0);        //filter all categories with amount greater than 0

    const chartData = {
        datasets: [{    
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    };

    return {filteredCategories, total, chartData};
};

export default useTransactions;