import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardCntnt from '../web/ResultsGridCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:'relative',
    top:'20%',
    left:'2%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
    border:'none',
    borderColor:'transparent',
    paddingLeft:'10%'
  },
}));

export default function NestedGrid(props) {
  const classes = useStyles();
  // const data=[1,2,3,4]
  const [data,setData]=useState(props.resultsData)

  function FormRow() {
    return (
      <React.Fragment>      
        {data.map((rw)=><Grid item xs={3}>
          <CardCntnt inptdata={rw} />
        </Grid>)}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
