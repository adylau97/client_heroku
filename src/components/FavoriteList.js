import React from 'react';
import './FavoriteList.css';
import Favorite from './Favorite'
import NoImgs from './NoImgs';


const FavoriteList = props =>{

  const results = props.url;
  //const uid = props.uid.uid;
  let imgs;
  
  if(results.length>0){
   imgs = results.map((img) => 
   <Favorite url={img} onClick={props.onClick}/>);
   //console.log(props.uid.uid);
  } else{
   imgs = <NoImgs/>;
  }


  return(
    <div className="container">
    <div className="row text-center text-lg-left">
    {imgs}
    </div>
    </div>
  );
};

export default FavoriteList;
