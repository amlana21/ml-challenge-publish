import React,{useState,useEffect} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    marginTop:'5px',
  },
  margin: {
    height: theme.spacing(3),
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '1',
  },
  {
    value: 40,
    label: '2',
  },
  {
    value: 60,
    label: '3',
  },{
    value: 80,
    label: '4',
  },{
    value: 100,
    label: '5',
  }
];

function valuetext(value) {
    // alert('nm')
  return `${value}`;
}

const ImageSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markLabel: {
    left: 'calc(-50% + 12px)',
    color: '#a0c1b8',
    // top: -22,
    top: '32px',
    '& *': {
      background: 'transparent',
      color: '#bfbfbf',
      textDecoration: 'solid'
    },
  },
})(Slider);

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const [doReset,setReset]=useState(props.resetSlider)
  const [resetValue,setVal]=useState(20)
  const handleChange = (event, newValue) => {
    props.ratingFunc({ratingval:newValue/20,movieId:props.selmovieid,moviename:props.selmoviename})
    setVal(newValue);
  };

  useEffect(()=>{
    //   alert('hhh')
    // valuetext(20)
    setVal(20)
  },[props.resetSlider])

  return (
    <div className={classes.root}>
      <ImageSlider
        defaultValue={resetValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={20}
        // aria-valuetext={'50'}
        // valueLabelDisplay="none"
        marks={marks}
        value={resetValue}
        onChange={handleChange}
      />
    </div>
  );
}
