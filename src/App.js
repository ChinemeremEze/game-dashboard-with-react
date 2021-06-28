import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';


class Home extends React.Component 
{  
    constructor(props){
	super(props);
	this.state={
		toRender : "byID",
		lists : []
		}
		this.fetchData= this.fetchData.bind(this);
	}
	componentDidMount(){
	fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
	{
		method: 'POST'
		,header: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	this.setState({lists: data});
	});
	
		
	}
  fetchData(e){
	e.preventDefault();
	
 
	fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
	{
		 method: "POST",
		body: JSON.stringify({
 		renderBy : this.state.toRender
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	this.setState({lists: data});
	});
	}
	
	renderSwitch(e){
		console.log(e.target.name)
		if(e.target.name === "byName"){
			this.setState({toRender : "byName"});
		}
		if(e.target.name === "byDeveloper"){
			this.setState({toRender : "byDeveloper"});
		}
		if(e.target.name === "byCompany"){
			this.setState({toRender : "byCompany"});
		}
		if(e.target.name === "byID"){
			this.setState({toRender : "byID"});
		}
	}
  render () 
  {     

    return ( <div>
		<h1>View Table Records</h1>
		<h2>Positions requested: {this.state.toRender} </h2>
			<table>
						<tr> <td> ID </td><td> NAME </td> <td>DEVELOPER</td> <td>DATE </td> <td>COMPANY</td> <td>DESCRIPTION</td></tr>
		{ this.state.lists.map(
		({id,name,developer,date,company,description}) => <tr key={id}>  <td> {id} </td><td> {name} </td> <td>{developer}</td> <td>{date} </td> <td>{company}</td> <td>{description}</td></tr>)}
		</table>
             <form onSubmit={this.fetchData}>
              <input type="submit" name ='byName' value=" SORT BY GAME NAME "onClick={this.renderSwitch.bind(this)} />
            <br/>
           
               <input type="submit" name ='byDeveloper' value="SORT BY DEVELOPER" onClick={this.renderSwitch.bind(this)}/>

            <br/>
   
              <input type="submit" name ='byCompany' value=" SORT BY COMPANY" onClick={this.renderSwitch.bind(this)}/>
 
            <br/>
              <input type="submit" name ='byID' value=" SORT BY GAME ID" onClick={this.renderSwitch.bind(this)}/>
			</form>
	</div> 
	);
  }    
};




class Edit extends React.Component 
{  
	constructor(props){
		super(props);
		this.state={
			lists : [],
			showing: false,
			action: "ADD",
			isAdd :true,
			updateId:''
		}
	}
  componentDidMount(){
	
		fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
		{
			method: 'POST'
			,header: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
			
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		this.setState({lists: data});
		});
	}
	
	showAdd(){
		this.setState({
			showing: !this.state.showing
		})
	}
	
	onAddSubmit(e){
		e.preventDefault();
		if(this.state.action === "EDIT"){
			const updateId = e.target.id;
			console.log(this.refs.name.value);
			console.log(this.state.updateId);
			fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
			{
				 method: "POST",
				body: JSON.stringify({
					updatedID :this.refs.id.value,
					updatedName:this.refs.name.value,
					updatedDeveloper:this.refs.developer.value,
					updatedDate: this.refs.date.value,
					updatedCompany:this.refs.company.value,
					updatedDescription:this.refs.description.value
				})
			})
			.then(response => response.json())
			.then(data => {
			console.log(data);
			this.setState({lists: data, action: "ADD", showing: ! this.state.showing , isAdd:true});
			});
			this.refs.id.value="";
			this.refs.name.value="";
			this.refs.developer.value="";
			this.refs.date.value="";
			this.refs.company.value="";
			this.refs.description.value="";
			
		}else{	
			fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
			{
				 method: "POST",
				body: JSON.stringify({
					insertID :this.refs.id.value,
					insertName:this.refs.name.value,
					insertDeveloper:this.refs.developer.value,
					insertDate: this.refs.date.value,
					insertCompany:this.refs.company.value,
					insertDescription:this.refs.description.value
				})
			})
			.then(response => response.json())
			.then(data => {
			console.log(data);
			this.setState({lists: data});
			});
			this.refs.id.value="";
			this.refs.name.value="";
			this.refs.developer.value="";
			this.refs.date.value="";
			this.refs.company.value="";
			this.refs.description.value="";
		}
	}
		onEdit(e){
			const updateId = e.target.id;
			this.setState({action: "EDIT", showing: true, updatedId: updateId, isAdd : false});			
			fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
			{
				method: "POST",
				body: JSON.stringify({
				updateId : updateId
				})
			})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				data.map(function(d){
				console.log(d.name);
				document.querySelector("#idID").value= d.id;
				document.querySelector("#idName").value= d.name;
				document.querySelector("#idDate").value= d.date;
				document.querySelector("#idDeveloper").value= d.developer;
				document.querySelector("#idCompany").value= d.company;
				document.querySelector("#idDescription").value= d.description;
				})
			});					
		}
		
		onDelete(e){
		fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
		{
			 method: "POST",
			body: JSON.stringify({
			deleteId:e.target.id
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		this.setState({lists: data});
		});
	}
	
  render () 
  {      
    return ( 
            <div>
		<h2>Edit The Games Table </h2>
		<table>
					<tr> <td> ID </td><td> NAME </td> <td>DEVELOPER</td> <td>DATE </td> <td>COMPANY</td> <td>DESCRIPTION</td></tr>
		{ this.state.lists.map(
		({id,name,developer,date,company,description}) => <tr key={id}><td> {id}  </td> <td> {name} </td> <td>{developer}</td> <td>{date} </td> <td>{company}</td> <td>{description}</td>
                    <input type="button" name="edit" value="EDIT" id={id} onClick={this.onEdit.bind(this)} /> <input type="button" name="delete" value="DELETE" id={id} onClick={this.onDelete.bind(this)}/>
            </tr>)}
			<input type="button" name="add" value={this.state.action} onClick={this.showAdd.bind(this)} id="add"/>
		</table> 
	
			
		{ this.state.showing ?
			<form id="addForm">
			{ this.state.isAdd ?
				<div className ="input-field"> 
					<label htmlFor="id">ID: </label>
					<input type="number"  id="idID"  name="id" ref="id" />
				</div> :
				<div className ="input-field"> 
					<label htmlFor="id">ID: </label>
					<input type="number"  id="idID"  name="id" ref="id" readonly ='readonly'/>
				</div>
			}
				<div className ="input-field"> 
					<label htmlFor="name">Name: </label>
					<input type="text" name="name" id="idName" ref="name"  />
				</div>
				<div className ="input-field"> 
				  <label htmlFor="developer">Developer: </label>
					<input type="text" name="developer" ref="developer" id="idDeveloper"  />
				</div>
				<div className ="input-field"> 
					<label htmlFor="date">Date: </label>
					<input type="date" name="Date" ref="date" id="idDate"  />
				</div>
				<div className ="input-field"> 
				<label htmlFor="company">Company: </label>
					<input type="text" name="company" ref="company" id="idCompany" />
				</div>
				<div className ="input-field"> 
				<label htmlFor="description">Description: </label>
					<input type="text" name="description" ref="description" id="idDescription" />
				</div>
				<input type="button" name="submit" value="Save" onClick={this.onAddSubmit.bind(this)} />

			</form> : null
		
		}
            </div>
          );
  }    
};


class About extends React.Component 
{  
  render () 
  {      
    return ( 
	<div>
		<p>The main purpose of this application is to create a website that allows the user to manipulate an sql table using mysql,
		react, and react router the sql table is a Game table that has information about the each game in the ists of games.
		The users can perform various activites like Viewing the table, Sorting the table, Searching for infomation on the table 
		and also Editing the table. The actions are performed using AJAX, PHP, and React</p>
		<br/><br/>
		<h2> Programmer: Ezeakudolu Chinemerem David</h2>
		</div>
	 );
  }    
};

// We can get at the url parameter with this.props.match.params 
// followed by the url parameter name defined in the route.  
class Search extends React.Component 
{
  constructor(props){
	super(props);
	this.state={
		searchInfo:"",
		lists : []
		}
		this.fetchData= this.fetchData.bind(this);
	}
	componentDidMount(){
	fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
	{
		method: 'POST'
		,header: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	this.setState({lists: data});
	});
	
		
	}
  fetchData(e){
	  	  
		  var searchInfo=""
	  this.setState({searchInfo : this.refs.searchString.value});
	  searchInfo =this.refs.searchString.value;
	  console.log(this.refs.searchString.value);
	  console.log(this.state.searchInfo);
	  console.log(searchInfo);
	  e.preventDefault();
	
	 fetch('https://csunix.mohawkcollege.ca/~000778050/10133/5/backend.php',
	{
		 method: "POST",
		body: JSON.stringify({
 		searchId : searchInfo
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	this.setState({lists: data});
	});
	}

  render () 
  {     

    return ( 
	<div>
		<h2>Search The Games Table </h2>
		<form>
		<input type="text" name='searchString' ref='searchString' onChange={this.fetchData}/>
		</form>
			<table>
			<tr> <td> ID </td><td> NAME </td> <td>DEVELOPER</td> <td>DATE </td> <td>COMPANY</td> <td>DESCRIPTION</td></tr>
		{ this.state.lists.map(
		({id,name,developer,date,company,description}) => <tr key={id}>  <td> {id} </td><td> {name} </td> <td>{developer}</td> <td>{date} </td> <td>{company}</td> <td>{description}</td></tr>)}
		</table>
	</div> 
	);
  }    
}


class App extends React.Component 
{
  render ()
  {
    return (

      <Router>
        <div>
          <h1> STACKS OF GAMES</h1>
		  {
              // Our NavLinks create navigiation links that React Router 
              // will associate with our routes.  NavLinks will use the 
              // active css class to style themselves when they are the 
              // active link.  See the active css class in App.css.  We
              // need to use the exact property for our root/home path 
              // otherwise home will always be considered active.
		  }
	<div>
            <span><NavLink exact to="/"  style={{ textDecoration: 'none' }}>Home</NavLink></span>
            <span><NavLink to="/Edit" style={{ textDecoration: 'none' }}>  Edit </NavLink></span>
            <span><NavLink to="/About" style={{ textDecoration: 'none' }}>About</NavLink></span>
            <span><NavLink to="/search" style={{ textDecoration: 'none' }}>Search</NavLink></span>
         </div>

          <hr/>
  
  {
            // Render a different component depending on the path, "/" is the 
            // "no path" case.  We add the property exact to have it render 
            // only on exact matches, otherwise "/" would also match for 
            // things like "/Edit".
  }
          <Route exact path="/" component={Home}/>
          <Route path="/edit" component={Edit}/>
          <Route path="/about" component={About}/>
         
		 {
          
            // A route with a url parameter in it, :text after /urlparm 
		 }
          <Route path="/search/" component={Search}/>
			  {         
            // We can have multiple components render in multiple areas by 
            // including multiple Route components.
			  }
		<br/>
		<br/>
		<br/>
		<hr />
		<footer> Copyright 2019 </footer>
	
        </div>
      </Router>
    );
  }
}

export default App;
