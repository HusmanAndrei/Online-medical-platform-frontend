import React, { Component } from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
// import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";

// const styles = (theme) => ({
//     ...theme.others
// });


export default class login extends Component{
    constructor(props) {
        super(props);
            
        this.state = {
            username: "",
            password: "",
            nimic:""
        };
        // {this.state.isLoaded && (localStorage.get("role")=== "PATIENT") &&
        //         <Redirect to="//caregiver"/>}
        // {this.state.isLoaded && (localStorage.get("role")=== "CAREGIVER") &&
        //         <Redirect to="/pagina/caregiver"/>}
        // {this.state.isLoaded && (localStorage.get("role")=== "DOCTOR") &&
        //         <Redirect to="/doctor"/>}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.ok=false;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        
    }

    redir(){
        console.log("in");
        console.log(localStorage.getItem("role"));
        if (this.ok===true){
            if (localStorage.getItem("role")=== "PATIENT"){
                return <Redirect to="/patient"/>;}
            else if (localStorage.getItem("role")=== "CAREGIVER"){
                let id = localStorage.getItem
                return <Redirect to="/caregiver2"/>;}
            else if (localStorage.getItem("role")=== "DOCTOR"){
                console.log("aiciii")
                return <Redirect to="/doctor"/>;} 
        }else{
            console.log("out");
            return null;
        }
    }
    handleSubmit(event){
        const { username, password } = this.state;
    
        axios
        .post(
            "http://localhost:8080/doctor/login",
            {
                    username: username,
                    password: password
            } 
        )
        .then(response => {
            //console.log(response);
            localStorage.setItem("role", response.data.type);
            localStorage.setItem("id", response.data.id);
            console.log(response.data.id);
            console.log(localStorage.getItem("role"));
            
            //console.log("merge");
            this.ok=true;
            //console.log(localStorage.getItem("role"));
            this.setState({nimic:"5"});
            if (response.data.status === "created") {
                this.props.handleSuccesfulAuth(response.data)
            }
            //this.redir();
        })
        .catch(error => {
            console.log("login error", error);
        });
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <input
                    type= "username"
                    name= "username"
                    placeholder= "Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                    />

                    <input
                    type= "password"
                    name= "password"
                    placeholder= "Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    />

                    <button type= "submit">Login</button>
                    {this.redir()}
                </form>
            </div>
        );
    }
}
// export default withStyles(styles)(login);