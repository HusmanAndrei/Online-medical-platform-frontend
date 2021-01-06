import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
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
import PatientForm from "./components/patient-form";

import * as API_USERS from "./api/patient-api"
import PatientTable from "./components/patient-table";



class PatientContainer extends React.Component {

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
            patientToEdit: null,
            isDoctor: (localStorage.getItem("role") === "DOCTOR")

        };
    }

    componentDidMount() {
        this.fetchPatients();
    }


    registerPatient(patient) {
        return API_USERS.postPatient(patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted patient with id: " + result);
                this.reload();
            } else {
                alert("Cannot add patient")
            }
        });
    }


    deletePatient(id) {
        return API_USERS.deletePatientById(id, () => this.filterPatientById(id));
    }

    filterPatientById(id){
        const patientss = this.state.tableData.filter(pat => pat.id !== id)
        console.log(this.state.tableData, id, patientss)
        this.setState({
            tableData: patientss
        }, () => console.log("State modified", this.state))
    }

    editPatient(patient) {
        this.setState({
            selected: true,
            patientToEdit : patient
        });
        
    }

    finishEditPatient(patient){

        API_USERS.editPatient(patient, () => this.reload())
        this.setState({
            patientToEdit: null,
            
        })
    }

    determineEditFunction(patient){
        console.log("Edited", patient, this)
        if(this.state.patientToEdit == null){
            return this.registerPatient(patient)
        }
        return this.finishEditPatient(patient)
    }

    fetchPatients() {
        return API_USERS.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                if(this.state.isDoctor)
                result = result.map(patient => {
                    return {
                        ...patient,
                        edit : <Button color="primary" onClick={() => this.editPatient(patient)}>Edit</Button>,
                        delete : <Button color="primary" onClick={() => this.deletePatient(patient.id)}>Delete</Button>
                    }
                });
                else
                result = result.map(patient => {
                    return {
                        ...patient
                    }
                });
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
            isLoaded: false,
            selected: false
        });
        //this.toggleForm();
        this.fetchPatients();
    }


    render() {

        
        return (
            <div>
                <CardHeader>
                    <strong> Patient Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    {
                        
                        this.state.isDoctor? (<Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Patient </Button>
                        </Col>
                    </Row>): <br/>
        }
                    
                    
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PatientTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>
                { this.state.selected && 
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm patientToEdit={this.state.patientToEdit} 
                        finishEdit={this.determineEditFunction.bind(this)}
                         clearEdit={() => this.setState({patientToEdit : null})} reloadHandler={this.reload}/>
                        
                    </ModalBody>
                </Modal>
                }
            </div>
        )

    }
}


export default PatientContainer;
