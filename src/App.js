import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, withRouter, Redirect,Link} from 'react-router-dom';
import ImgList from './components/ImgList';
import Navbar from './components/Navbar';
import Navbar_b from './components/Navbar_blogin';
import FavoriteList from './components/FavoriteList';
import fire from './config/Fire';
import NoImgs from './components/NoImgs';
import Login from './components/Login';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { join } from 'path';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class App extends Component {

  constructor(){
    super();
    this.state = {
      url: [],
      loadingState: true,
      page: 1,
      search:'nature',
      getFavorite: [],
      addFav:'',
      removeFav:'',
      loadingPage: true,
      user: {},
      uid:'',
      client:false
    };

  }

  componentDidMount(){
   /* axios.get('http://localhost:5000/getImage')
    axios.get('https://pixabay.com/api/?key=10095037-097333a2362dace817e1654de')
    .then(json => json.data.map(result =>(
      {
        url : result.largeImageURL
      }
    )))
    .then(newData=> this.setState({url: newData, loadingState: false}))
    .catch(error => alert(error))*/

    //this.authListener();

    if(localStorage.getItem('user')!== null){
      this.setState({uid:localStorage.getItem('user'),client:true});
    }

    this.performSearch();
    document.addEventListener('scroll',this.trackScrolling);
  }

  componentWillUpdate(){
    if(this.state.client){
      this.getFavorite();
      }
  }

  componentWillUnmount(){
    document.removeEventListener('scroll',this.trackScrolling);
  }

  isBottom(el){
    return el.getBoundingClientRect().bottom <= window.outerHeight;
  }

  trackScrolling = () =>{
    const wrappedElement = document.getElementById('container');
    this.state.loadingPage = true;
    if(wrappedElement === null){
    }else{
      if(this.isBottom(wrappedElement) && this.state.loadingPage == true && this.state.page <15){
        this.setState({page: this.state.page+1});
        this.performSearch();
        this.state.loadingPage = false;
      }
    }
  }

  query = e => {
    this.state.search = e;
    this.state.url=[];
    this.state.page=1;
    this.setState({loadingState:true});
    this.performSearch();
  };

  queryFav = e => {
    this.state.addFav = e;
    //alert(this.state.addFav);
    //alert("OK");
    this.addFavorite();
  };

  queryFavRemove = e => {
    this.state.removeFav = e;
    //alert(this.state.removeFav);
    //alert("OK");
    this.removeFavorite();
  };

  performSearch = () => {

    if(!this.state.search){
      this.state.search = 'nature';
      this.state.url=[];
      this.state.page=1;
      //this.state.loadingState=true;
      this.setState({loadingState:true });
      this.performSearch();
      return alert("Please enter keyword for search!!!");
    }
    const url = `https://mighty-meadow-87013.herokuapp.com/getImage/${this.state.page}/${this.state.search}`;
    console.log(url);
    axios.get(url)
    /*
    .then(json => json.data.map(result =>(
      {
        url : result.largeImageURL
      }
    )))
    .then(newData=> this.setState({url: newData, loadingState: false}))
    .catch(error => alert(error))*/

    .then(response =>{
      //console.log(response.data);
    
      /*var i;
      var joinedArray = [];
      for(i=0;i<10;i++){
        //console.log(response.data[i]);
        joinedArray = joinedArray.concat(response.data[i]);
       
      }

      for(i=10;i<20;i++){
        //console.log(response.data[i].user.name);
      
        var data={
          largeImageURL: response.data[i].urls.regular,
          id:response.data[i].id,
          tags:response.data[i].tags[0].title,
          user:response.data[i].user.name
        };
        joinedArray = joinedArray.concat(data);

        if(i==19){
          joinedArray = this.state.url.concat(joinedArray);
          this.setState({url: joinedArray, loadingState:false});
        }
      }*/

      var joinedArray = this.state.url.concat(response.data);
      this.setState({url: joinedArray, loadingState:false});
    })
    .catch(error => {
      alert(error);
      this.state.search = 'nature';
      this.state.url=[];
      this.state.page=1;
      //this.state.loadingState=true;
      this.setState({loadingState:true });
      this.performSearch();
    });

    //this.state.page = this.state.page + 1; 
  };
  
  getFavorite=()=>{
    const url = `https://mighty-meadow-87013.herokuapp.com/getFavorite/${this.state.uid}`;
    //console.log(this.state.user.uid);
    axios.get(url)
    .then(response=>{
      //console.log(response.data);
      this.setState({getFavorite: response.data});
    })
    .catch(error => {
      alert(error);
    });
  };

  addFavorite=()=>{
    const url = `https://mighty-meadow-87013.herokuapp.com/addFavorite`;
    axios({method:'post',url:url,data:{url: this.state.addFav, uid: this.state.uid}})
    .then(function(response){
      //console.log("TEST: ",response);
      alert("Image had been added to Favorite!");
    });
    //console.log(this.state.user);

    this.getFavorite();
  }

  removeFavorite=()=>{
    const url = `https://mighty-meadow-87013.herokuapp.com/removeFavorite`;
    axios({method:'delete',url:url,data:{id: this.state.removeFav}})
    .then(function(response){
      alert("Image had been removed from Favorite!");
    });

    this.getFavorite();
  }

  /*authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      //console.log(user);
      if(user){
        this.setState({user:user});
        this.getFavorite();
        //localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');
      }
    });
  }*/

  logout=()=>{
    //fire.auth().signOut();
   //window.location.reload();
   this.setState({user:null,uid:null,client:false,getFavorite:null,search:'nature'});
   localStorage.removeItem('user');
   //return <Redirect to='/'/>;
   window.location = '/';
  }

  /*addUser=(e,p)=>{
    const url = `/signUp/${e}/${p}`;
    axios.get(url)
    .then(res=>{
      console.log("TEST: ",res);
      this.setState({user:res});
    })
    .catch(function(err){
      console.log(err);
    });
  }*/

  addUser=(e)=>{
    this.setState({user:e,uid:e.localId,search:'nature'});
    this.state.client = true;
    //console.log(this.state.uid);
    localStorage.setItem('user',e.localId);
    this.getFavorite();
  }

  notice=()=>{
    window.location = '/login';
    alert("Please login in order to save the image!!");
    //return <Redirect to='/login'/>;
  }

  noticeFav=()=>{
    alert("Please login in order to save the image!!");
    return <Redirect to='/login'/>;
  }

  render() {

    return (
     <MuiThemeProvider>
     <Router>
      <div id="container">

      <div id="sticky-nav">
       {this.state.client ? <Navbar onSearch={this.query}/> :<Navbar_b onSearch={this.query}/>}
      </div>

      <div id="main">
       <Route path="/favorite" render={()=>this.state.client ? <FavoriteList url = {this.state.getFavorite} onClick={this.queryFavRemove}/>: this.noticeFav()}/>

       <Route path="/login" render={()=>this.state.client ?<Redirect to ='/'/> : <Login onAddUser={this.addUser}/>}/>

       <Route path="/logout" render={this.logout}/>

       <Route exact path="/" render={()=>this.state.client ? this.state.loadingState ?<p>Loading...</p> :<ImgList images = {this.state.url}  onClick={this.queryFav}/> : this.state.loadingState ?<p>Loading...</p> : <ImgList images = {this.state.url}  onClick={this.notice}/>}/>
       
      </div>
      </div>
     </Router>

      <ScrollUpButton style={{width: 100, height:100}} ToggledStyle={{right: 100}}/>

     </MuiThemeProvider>

    /* <div>
				<div className="main-header">
					<div className="inner">
						<h1 className="main-title">ImageSearch</h1>
					</div>
				</div>
				<div className="main-content">
					<ImgList url={this.state.url} />
				</div>
      </div>*/
      
    );
  }
}

export default App;
