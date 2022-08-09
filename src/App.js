import { Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{height: '100vh'}}>
          <Grid item xs={12} sm={4} className={classes.mobile}>
            <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={3} className={classes.main}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.desktop}>
            <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.last}>
            <Details title="Expense"/>
          </Grid>
      </Grid>
      {/* speechly */}
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </div>
  );
}

export default App;
