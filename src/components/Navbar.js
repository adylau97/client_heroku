import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Redirect from 'react-router-dom/Redirect';

export default class CustomNavBar extends Component{

  state = {
		searchText: ''
  };
  
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };
  
  handleSubmit = e => {
		//e.preventDefault();
    this.props.onSearch(this.query.value);
    this.query.value="";
    //e.currentTarget.reset();
	};

  render(){
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><img src="http://chittagongit.com//images/wave-icon-png/wave-icon-png-15.jpg"/>Wave</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          <div className="search-form">
            <input
              type="search"
              id="search"
              onChange={this.onSearchChange}
              ref={input => (this.query = input)}
              name="search"
              placeholder="Search..."
            />
             &nbsp;
           <Link to="/">
            <button type="button" id="submit" className="search-button" onClick={this.handleSubmit}>
              <i>search</i>
            </button>
            </Link>
            </div>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/" to="/favorite">
              Favorites
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/" to="/logout">
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}