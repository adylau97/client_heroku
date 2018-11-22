import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../config/Fire';
import axios from 'axios';
import App from '../App';
import { app } from 'firebase';
import './Login.css';


export default class Login extends Component {

  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = e => {
    e.preventDefault();
    /*fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });*/

      if(!this.state.email){
        return alert('Email is not entered!');
      }

      if(!this.state.password){
        return alert('Password is not entered!');
      }

      if(this.validateEmail(this.state.email)){
      const url = `https://mighty-meadow-87013.herokuapp.com/signIn`;
      axios({method:'post',url:url,data:{email: this.state.email, password: this.state.password}})
      .then(res=>{
        //console.log(res.data);

        if(res.data.success){
          this.props.onAddUser(res.data.message);
          alert("Login successfully!");
          //console.log(res.data.message);
        }else{
          alert(res.data.message);
        }
      
      })
      .catch(function(err){
        alert(err);
      });
    }else{
      alert("Email address is not valid!!");
    }
    
  }

  signup = e =>{
    e.preventDefault();
    /*fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })*/

      //this.props.onAddUser(this.state.email,this.state.password);
      if(!this.state.email){
        return alert('Email is not entered!');
      }

      if(!this.state.password){
        return alert('Password is not entered!');
      }

    if(this.validateEmail(this.state.email)){
      const url = `https://mighty-meadow-87013.herokuapp.com/signUp`;
      axios({method:'post',url:url,data:{email: this.state.email, password: this.state.password}})
      .then(res=>{
        //console.log("TEST: ",res);
        
        if(res.data.success){
          this.props.onAddUser(res.data.message);
          alert("Sign up successfully!");
          //console.log(res.data.message);
        }else{
          alert(res.data.message);
        }

        /*if(res.data=="ERR"){
          alert("Password length must be more than 6");
        }else{
        this.props.onAddUser(res);
        }*/

      })
      .catch(function(err){
        alert(err);
      });
    }else{
      alert("Email address is not valid!!");
    }

  }

  validateEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <div className="grandcontainer">
       <h2>Log In or Sign Up Here</h2>
       <div className="col-md-6">
       <form className="form_login">
      
      <div class="form-group">
       <label for="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
       <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" onClick={this.login} style={{marginLeft: '130px'}} class="btn btn-primary">Login</button>
      <button type="submit" onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
 </form>
 
 </div>
 </div>
    );
  }
}
