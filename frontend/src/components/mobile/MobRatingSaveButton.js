import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginLeft:'150px'
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();
  const [showLoading,setLoading]=useState(false)

  async function clickFunc(){
    console.log(props.saveRatingval)
    if(!props.allMovieArry.includes(props.currntSelctdMovie)){
      alert('Please select a rating!!')
      return
    }
    try{
      const apiUrl=`${process.env.REACT_APP_MLAPIDOMAIN}/getrecomcollab`
      const databody=[]
      props.saveRatingval.forEach(rw => {
        let tmprw={}
        tmprw.title=rw.moviename
        tmprw.rating=rw.ratingval
        databody.push(tmprw)
      });
      setLoading(true)
      const recomresp=await fetch(apiUrl,{
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(databody)
      })
      const recomjson=await recomresp.json()
      console.log('recomjson')
      console.log(recomjson)
      props.getResults((oldval)=>[...oldval,...recomjson])
      props.showRsultspage(true)
      }catch(e){
        setLoading(false)
        alert('Error in getting the movies. Please try to refresh the page and try again!!!')
      }

  }

  return (
    <div className='mobratingsavebtn'>
      
      {!showLoading && <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={clickFunc}
      >
        Save
      </Button>}
      {showLoading && <CircularProgress color="secondary" />}
    </div>
  );
}
