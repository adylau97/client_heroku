/*import React from 'react';
import './ImgList.css';
import Img from './Img'
import NoImgs from './NoImgs';
import {GridList} from 'material-ui/GridList';

const ImgList = props =>{

  const results = props.url;
  let imgs;

  if(results.length>0){
   imgs = results.map(img => <Img url={img.largeImageURL} title={img.tags} subtitle={img.user} onClick={props.onClick}/>);
  } else{
   imgs = <NoImgs/>;
  }


  return(
    <GridList cols={5} cellHeight={300}>
      {imgs}
    </GridList>
  );
};

export default ImgList;*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import './ImgList.css';


class ImgList extends Component{

  state = {
    open: false,
    currentImg: ''
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () =>{
    this.props.onClick(this.state.currentImg);
  }

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={5} cellHeight={300}>
          {images.map(img => (

            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <button className="favorite" onClick={this.handleSubmit}><i className="fa fa-star" aria-hidden="true"></i></button>
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

<img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
      
        </Dialog>
      </div>
    );
  }
}

ImgList.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImgList;
