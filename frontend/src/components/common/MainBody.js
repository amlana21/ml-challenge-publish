import React,{useState} from 'react'
import MainImgSlider from '../web/MainImageSlider'
import ResultsGrid from '../web/ResultsGrid'
import Typography from '@material-ui/core/Typography';
import MobMainImgSlider from '../mobile/MobMainImageSlider'
import ResultsStepper from '../mobile/ResultsStepper'

function MainBody(){

    const [showResults,setResults]=useState(false)
    const [resultsArray,setResultsarr]=useState([])

    const [mobshowResults,setmobResults]=useState(false)
    const [mobresultsArray,setmobResultsarr]=useState([])
   

    return <>
    <div className='mainContainer'>
        {!showResults &&  <Typography variant="h2" component="h2" className='webmainlabel' >Please Rate these movies</Typography>}
        {showResults && <Typography variant="h2" component="h2" className='webmainlabel' >Your Recommendations</Typography>}
        {showResults && <div className='resultscontainer'>
            <ResultsGrid resultsData={resultsArray} />
        </div>}
        {!showResults && <div className='slidercontainer'>
        <MainImgSlider setResults={setResultsarr} setShowResults={setResults} />
        </div>}        
    </div>

    <div className='mobmainContainer'>
    {!mobshowResults &&  <Typography variant="h4" component="h2" className='mobmainlabel' >Please Rate these movies</Typography>}
    {mobshowResults && <Typography variant="h4" component="h2" className='mobmainlabel' >Your Recommendations</Typography>}
    {mobshowResults && <div className='mobresultscontainer'>
            <ResultsStepper resultsData={mobresultsArray} />
        </div>}
    {!mobshowResults && <div className='mobslidercontainer'>
        <MobMainImgSlider setResults={setmobResultsarr} setShowResults={setmobResults} />
        </div>}
    </div>

    </>
}

export default MainBody