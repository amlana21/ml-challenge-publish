import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    flexGrow: 1,
    top: '10%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    // maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));

export default function TextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = tutorialSteps.length;
  const [data,setData]=useState(props.resultsData)
  const [tutorialSteps,setImages]=useState([{
    label: 'Loading',
    imageurl:
      'https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif',
  }])
  const [maxSteps,setMaxsteps]=useState(tutorialSteps.length-1)

  useEffect(()=>{
    if(data.length>0){
      setMaxsteps(props.resultsData.length-1)
    setImages(props.resultsData)
    }
    // getMovies()
  },[props.resultsData])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <img
        className={classes.img}
        // src={data[0].imageurl}
        src={tutorialSteps[activeStep].imageurl}
        // alt={tutorialSteps[activeStep].label}
      />
      <MobileStepper
        // steps={maxSteps}
        steps={props.resultsData.length}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}
