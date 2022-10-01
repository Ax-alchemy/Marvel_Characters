import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div className='container' style={{margin:"auto", textAlign:"center", paddingTop:"20%"}}>
        <ClipLoader color='#1ba822'/>
    </div>
  )
}

export default Loader