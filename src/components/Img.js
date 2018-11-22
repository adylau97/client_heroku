import React from 'react';
import App from '../App';
import {GridTile} from 'material-ui/GridList';
import IconButtom from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const Img = props => {

function handleSubmit(){
  props.onClick(props.url);
}

return(

<GridTile title={props.title} subtitle={<span>by <strong>{props.subtitle}</strong></span>} actionIcon={<IconButtom onClick={handleSubmit}><ZoomIn color="white"/></IconButtom>}>

<img src={props.url} alt=""/>

</GridTile>

);
};

export default Img;


/*<div className="col-lg-3 col-md-4 col-xs-6">
<a href={props.url} target="_blank" className="d-block mb-4 h-100">
  <img width="300" height="300" src={props.url} alt=""/>
</a>
<p/>
<p><button className="favorite" type="submit" onClick={handleSubmit}><i className="fa fa-star" aria-hidden="true"></i></button></p>
</div>*/