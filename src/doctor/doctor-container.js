import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import DoctorForm from "./components/doctor-form";

import * as API_USERS from "./api/doctor-api"
import DoctorTable from "./components/doctor-table";



class DoctorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            isDoctor: (localStorage.getItem("role") === "DOCTOR")
        };
    }

    componentDidMount() {
        
        this.fetchDoctors();
    }

    fetchDoctors() {
        console.log(localStorage.getItem("role"))
        if(localStorage.getItem("role") !== "DOCTOR"){
            return <Redirect to="/login"/>;
        }

        return API_USERS.getDoctors((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchDoctors();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Doctor Management </strong>
                </CardHeader>
                <Card>
                    <br/>{
                    this.state.isDoctor?(
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Doctor </Button>
                        </Col>
                    </Row>):
                    <br/>}
                    <Row>
                    
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <DoctorTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Doctor: </ModalHeader>
                    <ModalBody>
                        <DoctorForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default DoctorContainer;
